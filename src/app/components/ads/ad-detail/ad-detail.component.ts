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
  images = [
    {id:1, src:"/assets/images/jazz1.jpg"},
    {id:2, src:"/assets/images/jazz2.jpg"},
    {id:3, src:"/assets/images/jazz3.jpg"},
    {id:4, src:"/assets/images/jazz4.jpg"},
    {id:5, src:"/assets/images/jazz5.jpg"},
    {id:6, src:"/assets/images/jazz6.jpg"},
    {id:7, src:"/assets/images/jazz7.jpg"},
    {id:8, src:"/assets/images/jazz8.jpg"},
    {id:9, src:"/assets/images/jazz9.jpg"},
    {id:10, src:"/assets/images/jazz10.jpg"},
    {id:11, src:"/assets/images/jazz11.jpg"},
    {id:12, src:"/assets/images/jazz12.jpg"},
  ];

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
