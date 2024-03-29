import { Component, OnInit } from '@angular/core';
import { AdService } from 'src/app/services/ad/ad.service';
import { CategoryService } from 'src/app/services/category/category.service';
import { Unsubscribe } from 'src/app/_helpers/_unscubscribe/unsubscribe';
import { takeUntil } from 'rxjs';
import { Category } from 'src/app/models/category';
import { IAd } from 'src/app/models/IAd';

@Component({
  selector: 'app-ads-list',
  templateUrl: './ads-list.component.html',
  styleUrls: ['./ads-list.component.css']
})
export class AdsListComponent extends Unsubscribe implements OnInit {

  categories: Category[] = [];
  ads: IAd[] = [];
  filteredAds : IAd[] = [];
  search: string = '';

  constructor(private adService: AdService,
              private categoryService: CategoryService) {
                super();
              }

  ngOnInit() : void {
    this.getAds();
    this.getCategories();
  }

  getAds(): void {
    this.adService.getAllAds()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe( res => this.ads = res.reverse()); 
  }

  getCategories() {
    this.categoryService.getCategories()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(res => this.categories = res)
  }

  categoryFilter(event: any) {
    this.filteredAds = [];
    this.ads.filter( elem =>{
     if (elem.category.id == event.target.value){
      this.filteredAds.push(elem);
     }
    });
  }

  removeFilter() {
    this.filteredAds = [];
  }

  onSearchTextChanged(event:any) {
    this.filteredAds = [];
    this.ads.forEach(ad => {
      let adTitle = ad.title.toLocaleLowerCase();
      let searchString = event.target.value.toLocaleLowerCase();
      if (adTitle.search(searchString) != -1) {
        this.filteredAds.push(ad)
      }
    });
  }
}
