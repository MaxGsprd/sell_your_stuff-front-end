import { Component, OnInit } from '@angular/core';
import { AdService } from 'src/app/services/ad.service';
import { ICategory } from 'src/app/models/ICategory.interface';
import { IAdResponseDto } from 'src/app/models/dtos/IAdResponseDto';
import { CategoryService } from 'src/app/services/category.service';
import { Unsubscribe } from 'src/app/_helpers/_unscubscribe/unsubscribe';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-ads-list',
  templateUrl: './ads-list.component.html',
  styleUrls: ['./ads-list.component.css']
})
export class AdsListComponent extends Unsubscribe implements OnInit {

  categories: ICategory[] = [];
  ads: IAdResponseDto[] = [];
  filteredAds : IAdResponseDto[] = [];
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
      .subscribe(res => this.ads = res.reverse());
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
