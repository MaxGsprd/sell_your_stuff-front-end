import { Component, OnInit } from '@angular/core';
import { AdService } from 'src/app/services/ad.service';
import { CategoryService } from 'src/app/services/category.service';
import { IAd } from '../../../models/IAd.interface';
import { Category } from 'src/app/models/category';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-ads-list',
  templateUrl: './ads-list.component.html',
  styleUrls: ['./ads-list.component.css']
})
export class AdsListComponent implements OnInit {

  ads: Array<IAd> = [];
  categories: Array<Category> = [];
  userSubmitted!:boolean;
  searchAdForm!: FormGroup;

  constructor(private adService: AdService, private categoryService: CategoryService, private formBuilder: FormBuilder) {}

  ngOnInit() : void {
    this.adService.getAllAds().subscribe({
      next: (response) => this.ads = response,
      error: (error) => console.error(error)
    });

    this.categoryService.getCategories().subscribe({
      next: (res: Array<Category>) => this.categories = res,
      error: (err) => console.log(err)
    });

    this.createSearchForm();
  }

  createSearchForm(): void {
    this.searchAdForm = this.formBuilder.group({
      category: [null, null],
    });
  }

  onSubmit() {
    console.log(this.searchAdForm);
  }

  /**
   * Getter methods for form controls
   */
  get category() { return this.searchAdForm.get('category'); }
}
