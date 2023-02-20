import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdService } from 'src/app/services/ad.service';
import { ICategory } from 'src/app/models/ICategory.interface';
import { IAdResponseDto } from 'src/app/models/dtos/IAdResponseDto';

@Component({
  selector: 'app-ads-list',
  templateUrl: './ads-list.component.html',
  styleUrls: ['./ads-list.component.css']
})
export class AdsListComponent implements OnInit {

  ads: IAdResponseDto[] = [];
  categories: ICategory[] = [];
  userSubmitted!:boolean;
  searchAdForm!: FormGroup;

  constructor(private adService: AdService, private formBuilder: FormBuilder) {}

  ngOnInit() : void {
    this.getAds();
    
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

  /**
   * Getter methods for form controls
   */
  get category() { return this.searchAdForm.get('category'); }
}
