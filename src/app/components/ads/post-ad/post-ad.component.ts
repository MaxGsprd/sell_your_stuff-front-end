import { Component, OnInit} from '@angular/core';
import { FormGroup, Validators, AbstractControl, ValidationErrors, FormBuilder } from '@angular/forms';
import { Ad } from 'src/app/models/ad';
import { AdService } from 'src/app/services/ad.service';
import { IAd } from '../../../models/IAd.interface';

@Component({
  selector: 'app-post-ad',
  templateUrl: './post-ad.component.html',
  styleUrls: ['./post-ad.component.css']
})
export class PostAdComponent implements OnInit {
  postAdForm!: FormGroup;
  userSubmitted!:boolean;
  conditions: Array<string> = ["New","Used - like new", "Used - good", "Used - fair", "Used - poor"];
  adCardPreview: IAd = {
    id: 0,
    author: 0,
    title: "Ad preview title",
    description: "A description of the ad. The more precise the better !",
    category: 0,
    price: 0,
    publicationDate: new Date(),
    condition: 0,
    location: 0,
    Image: [new Object()]
  };
  ad = new Ad();

  constructor (private formBuilder: FormBuilder, private adService: AdService) { }

  ngOnInit(): void {
    this.createPostAdForm();
  }

  createPostAdForm(): void {
    this.postAdForm = this.formBuilder.group({
      title: [null, [Validators.required, Validators.minLength(8)]],
      price: [null, Validators.required],
      description: [null, [Validators.required, Validators.minLength(10)]],
      category: [null, Validators.required],
      condition: [null, ''],
    });
  }

  onSubmit() {
    console.log(this.postAdForm);
    this.userSubmitted = true;

    if (this.postAdForm.valid) {
      console.log('form valid');
      // this.mapAd();
      // this.adService.postAd(this.ad);
      // this.postAdForm.reset();
      // this.userSubmitted = false;
    }
  }

  mapAd(): void {
    // this.ad.Title = this.title?.value;
    // this.ad.Date = new Date();
    // this.ad.Price = +this.price?.value;
    // this.ad.Description = this.description?.value;
    // this.ad.Category = this.category?.value;
    // this.ad.Condition = this.condition?.value;

  }

  /**
   * Getter methods for form controls
   */
  get title() { return this.postAdForm.get('title'); }
  get price() { return this.postAdForm.get('price'); }
  get description() { return this.postAdForm.get('description'); }
  get category() { return this.postAdForm.get('category'); }
  get condition() { return this.postAdForm.get('condition'); }
}
