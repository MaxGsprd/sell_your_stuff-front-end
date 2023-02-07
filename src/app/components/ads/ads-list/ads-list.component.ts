import { Component } from '@angular/core';
import { AdsService } from 'src/app/services/ads.service';

@Component({
  selector: 'app-ads-list',
  templateUrl: './ads-list.component.html',
  styleUrls: ['./ads-list.component.css']
})
export class AdsListComponent {
  
  public Items: any;

  constructor(private adsService: AdsService){  }

  ngOnInit() : void {
    this.adsService.getAllAds().subscribe({
      next: (response) => this.Items = response,
      error: (error) => console.error(error)
    });
  }
}
