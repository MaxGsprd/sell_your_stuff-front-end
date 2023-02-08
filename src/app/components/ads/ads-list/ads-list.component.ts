import { Component, OnInit } from '@angular/core';
import { AdsService } from 'src/app/services/ads.service';
import { IAd } from '../IAd.interface';

@Component({
  selector: 'app-ads-list',
  templateUrl: './ads-list.component.html',
  styleUrls: ['./ads-list.component.css']
})
export class AdsListComponent implements OnInit {

  public Ads: Array<IAd> = [];

  constructor(private adsService: AdsService) {}

  ngOnInit() : void {
    this.adsService.getAllAds().subscribe({
      next: (response) => this.Ads = response,
      error: (error) => console.error(error)
    });
  }
}
