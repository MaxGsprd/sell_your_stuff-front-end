import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AdService } from 'src/app/services/ad.service';
import { ICategory } from 'src/app/models/ICategory.interface';
import { IAdResponseDto } from 'src/app/models/dtos/IAdResponseDto';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-ads-list',
  templateUrl: './ads-list.component.html',
  styleUrls: ['./ads-list.component.css']
})
export class AdsListComponent implements OnInit {

  categories: ICategory[] = [];
  ads: IAdResponseDto[] = [];
  filteredAds : IAdResponseDto[] = [];
  search: string = '';

  constructor(private adService: AdService, private formBuilder: FormBuilder, private categoryService: CategoryService) {}

  ngOnInit() : void {
    this.getAds();
    this.getCategories();
  }

  getAds(): void {
    this.adService.getAllAds().subscribe({
      next: (res) => this.ads = res,
      error: (error) => console.error(error)
    });
  }

  getCategories() {
    this.categoryService.getCategories().subscribe({
      next: (res) => this.categories = res,
      error: (error) => console.error(error)
    })
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
