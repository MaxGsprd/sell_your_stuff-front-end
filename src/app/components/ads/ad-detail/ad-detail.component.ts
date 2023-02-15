import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ad } from 'src/app/models/ad';
import { IAd } from 'src/app/models/IAd.interface';
import { AdService } from 'src/app/services/ad.service';

@Component({
  selector: 'app-ad-detail',
  templateUrl: './ad-detail.component.html',
  styleUrls: ['./ad-detail.component.css']
})
export class AdDetailComponent implements OnInit {

  ad: IAd = {} as IAd;

  constructor(private route: ActivatedRoute, private adService: AdService) {  }

  ngOnInit(): void{
    this.getAd();
  }

  getAd(): void {
    const routeParams = this.route.snapshot.paramMap;
    const adIdFromRoute = Number(routeParams.get('id'));

    this.adService.getAd(adIdFromRoute)
    .subscribe({
      next: (response) => this.ad = response,
      error: (err) => console.log(err)
    });
  }

}
