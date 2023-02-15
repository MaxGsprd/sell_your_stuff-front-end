import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdService } from 'src/app/services/ad.service';
import { CategoryService } from 'src/app/services/category.service';
import { IAd } from '../../../models/IAd.interface';
import { ICategory } from 'src/app/models/ICategory.interface';
import { map } from 'rxjs';

@Component({
  selector: 'app-ads-list',
  templateUrl: './ads-list.component.html',
  styleUrls: ['./ads-list.component.css']
})
export class AdsListComponent implements OnInit {

  ads: IAd[] = [];
  categories: ICategory[] = [];
  userSubmitted!:boolean;
  searchAdForm!: FormGroup;

  constructor(private adService: AdService, private categoryService: CategoryService, private formBuilder: FormBuilder) {}

  ngOnInit() : void {
    this.getAds();
    this.getCategories();

    this.searchAdForm = this.formBuilder.group({
      category: [null, null],
    });

    
  }

  onSubmit() {
    console.log(this.searchAdForm);
  }

  getAds(): void {
    this.adService.getAllAds().subscribe({
      next: (res) => this.ads = res,
      error: (error) => console.error(error)
    });
  }

  getCategories(): any{
    this.categoryService.getCategories().subscribe({
      next: (res) => this.categories = res,
      error: (err) => console.log(err)
    });
  }

  /**
   * Getter methods for form controls
   */
  get category() { return this.searchAdForm.get('category'); }
}
