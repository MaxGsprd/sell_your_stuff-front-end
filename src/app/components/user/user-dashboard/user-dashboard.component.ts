import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IAdResponseDto } from 'src/app/models/dtos/IAdResponseDto';
import { IUserResponseDto } from 'src/app/models/dtos/IUserResponseDto';
import { AdService } from 'src/app/services/ad.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit{

  user = {} as IUserResponseDto;
  ads: IAdResponseDto[] = [];
  selectedAdId: number = 0;

  constructor(private route: ActivatedRoute, private userService: UserService, private adService: AdService) {}

  ngOnInit(): void {

    const routeParams = this.route.snapshot.paramMap;
    const userId = Number(routeParams.get('id'));

    if (userId) {
      this.userService.getUser(userId).subscribe({
        next: (res) => {
          this.user = res;
          this.adService.getAdByUser(this.user.id).subscribe({
            next: (res) => {
              // console.log(res);
              this.ads = res;
            },
            error: (err) => console.log(err)

          });
        }
      });
    }
    // console.log(this.user)
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
