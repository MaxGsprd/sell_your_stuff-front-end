import { Component, OnInit } from '@angular/core';
import { AdService } from 'src/app/services/ad.service';
import { CategoryService } from 'src/app/services/category.service';
import { IAd } from '../../../models/IAd.interface';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-ads-list',
  templateUrl: './ads-list.component.html',
  styleUrls: ['./ads-list.component.css']
})
export class AdsListComponent implements OnInit {

  public ads: Array<IAd> = [];

  constructor(private adService: AdService, private categoryService: CategoryService) {}

  ngOnInit() : void {
    this.adService.getAllAds().subscribe({
      next: (response) => {
        this.ads = response;
        console.log(this.ads);
      },
      error: (error) => console.error(error)
    });

    //TEST CATEGORY
    this.categoryService.getCategories().subscribe({
      next: (res: Array<Category>) => console.log(res),
      error: (err) => console.log(err)
    });

  }
}
