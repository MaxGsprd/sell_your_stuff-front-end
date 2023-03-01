import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IAdResponseDto } from 'src/app/models/dtos/IAdResponseDto';
import { IUserResponseDto } from 'src/app/models/dtos/IUserResponseDto';
import { IMessage } from 'src/app/models/IMessage.interface';
import { AdService } from 'src/app/services/ad.service';
import { MessageService } from 'src/app/services/message.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit{

  user = {} as IUserResponseDto;
  ads: IAdResponseDto[] = [];
  messagesReceived: IMessage[] = [];
  messagesSent: IMessage[] = [];
  selectedAdId: number = 0;

  constructor(private route: ActivatedRoute, 
              private userService: UserService, 
              private adService: AdService,
              private messageService: MessageService) {}

  ngOnInit(): void {

    const routeParams = this.route.snapshot.paramMap;
    const userId = Number(routeParams.get('id'));

    if (userId) {
      this.userService.getUser(userId).subscribe({
        next: (res) => {
          this.user = res;
          this.adService.getAdByUser(this.user.id).subscribe({
            next: (res) => this.ads = res,
            error: (err) => console.log(err)
          });
        }
      });

      this.messageService.getMessagesReceivedByUser(userId).subscribe({
        next: (res) => {
          this.messagesReceived = res;       
        },
        error: (err) => console.log(err)
      });

      this.messageService.getMessagesSentByUser(userId).subscribe({
        next: (res) => {
          this.messagesSent= res;       
        },
        error: (err) => console.log(err)
      });
    }


  }


  confirmDelete(id: number) {
    this.selectedAdId = id;
  }

  deleteAd() {
    this.adService.deleteAd(this.selectedAdId).subscribe();
    this.selectedAdId = 0;
    window.location.reload();
  }
  
}
