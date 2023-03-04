import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IAdResponseDto } from 'src/app/models/dtos/IAdResponseDto';
import { IMessageRequest } from 'src/app/models/dtos/IMessageRequestDto';
import { IUserResponseDto } from 'src/app/models/dtos/IUserResponseDto';
import { AdService } from 'src/app/services/ad.service';
import { MessageService } from 'src/app/services/message.service';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-ad-detail',
  templateUrl: './ad-detail.component.html',
  styleUrls: ['./ad-detail.component.css']
})
export class AdDetailComponent implements OnInit {

  ad: IAdResponseDto | undefined;
  messageForm!: FormGroup;
  userSubmitted!:boolean;
  currentUser: IUserResponseDto = {} as IUserResponseDto

  constructor(private route: ActivatedRoute, 
              private adService: AdService,
              private toastr: ToastrService,
              private tokenService: TokenService,
              private userService: UserService,
              private messageService: MessageService,
              private router: Router) {  }

  ngOnInit(): void{
    this.getAd();
    this.getCurrentUser();
    this.messageForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      body: new FormControl('', [Validators.required])
    });
  }

  getAd(): void {
    const routeParams = this.route.snapshot.paramMap;
    const adIdFromRoute = Number(routeParams.get('id'));
    this.adService.getAd(adIdFromRoute).subscribe({
        next: (response) => this.ad = response,
        error: () =>  this.router.navigate(['/'])
    });
  }

  sendMessage() {
    this.userSubmitted = true;
    if (this.messageForm.valid) {
      let newMessage = this.messageFormToMessage(this.messageForm.value);
      this.messageService.postMessage(newMessage).subscribe();
      this.messageForm.reset();
      this.userSubmitted = false;
      this.toastr.success('Congratulations, your message has been sent.', 'Thank you !');
    }
  }

  messageFormToMessage(formValues: any): IMessageRequest {
    let message = {} as IMessageRequest;
    message.title = formValues.title;
    message.body = formValues.body;
    message.authorId = this.currentUser.id;
    message.recipientId = this.ad?.user.id;
    message.adId = this.ad?.id;
    message.isRead = false;
    message.date = new Date();
    return message;
  }

  getCurrentUser() {
    if (this.tokenService.isLogged()) {
      this.userService.getLoggedInUserId().subscribe({
        next: (res) => this.userService.getUser(parseInt(res)).subscribe( data => this.currentUser = data),
        error: (err) => console.error(err)
      });
    }
  }

  /**
   * Getter methods for form controls
   */
    get title() { return this.messageForm.get('title'); }
    get body() { return this.messageForm.get('body'); }
}
