import { Component, OnInit} from '@angular/core';
import { FormGroup, Validators, AbstractControl, ValidationErrors, FormBuilder } from '@angular/forms';
import { AdService } from 'src/app/services/ad.service';

@Component({
  selector: 'app-post-ad',
  templateUrl: './post-ad.component.html',
  styleUrls: ['./post-ad.component.css']
})
export class PostAdComponent implements OnInit {
  postAdForm!: FormGroup;
  userSubmitted!:boolean;

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
      this.postAdForm.reset();
      this.userSubmitted = false;
    }
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
