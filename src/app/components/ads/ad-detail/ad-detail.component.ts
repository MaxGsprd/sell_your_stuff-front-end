import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IAdResponseDto } from 'src/app/models/dtos/IAdResponseDto';
import { AdService } from 'src/app/services/ad.service';

@Component({
  selector: 'app-ad-detail',
  templateUrl: './ad-detail.component.html',
  styleUrls: ['./ad-detail.component.css']
})
export class AdDetailComponent implements OnInit {

  ad: IAdResponseDto = {} as IAdResponseDto;
  mainImg = {id:1, src:"/assets/images/jazz1.jpg"};
  images = [];

  constructor(private route: ActivatedRoute, private adService: AdService, private router: Router) {  }

  ngOnInit(): void{
    this.getAd();
  }

  getAd(): void {
    const routeParams = this.route.snapshot.paramMap;
    const adIdFromRoute = Number(routeParams.get('id'));

    this.adService.getAd(adIdFromRoute)
    .subscribe({
      next: (response) => this.ad = response,
      error: (err) =>  this.router.navigate(['/'])
    });
  }

  changeMainImg(event: any) {
    this.mainImg = event;
  }

}
