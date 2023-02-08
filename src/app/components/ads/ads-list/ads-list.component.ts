import { Component, OnInit } from '@angular/core';
import { AdService } from 'src/app/services/ad.service';
import { IAd } from '../IAd.interface';

@Component({
  selector: 'app-ads-list',
  templateUrl: './ads-list.component.html',
  styleUrls: ['./ads-list.component.css']
})
export class AdsListComponent implements OnInit {

  public Ads: Array<IAd> = [];

  constructor(private adService: AdService) {}

  ngOnInit() : void {
    this.adService.getAllAds().subscribe({
      next: (response) => this.Ads = response,
      error: (error) => console.error(error)
    });
  }
}
