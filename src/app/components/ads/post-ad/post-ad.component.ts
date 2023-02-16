import { Component, OnInit} from '@angular/core';
import { FormGroup, Validators, ValidationErrors, FormBuilder, FormControl } from '@angular/forms';
import { AdService } from 'src/app/services/ad.service';
import { ConditionService } from 'src/app/services/condition.service';
import { IAd } from '../../../models/IAd.interface';
import { ICondition } from 'src/app/models/ICondition.interface';
import { ICategory } from 'src/app/models/ICategory.interface';
import { CategoryService } from 'src/app/services/category.service';
    
@Component({
  selector: 'app-post-ad',
  templateUrl: './post-ad.component.html',
  styleUrls: ['./post-ad.component.css']
})
export class PostAdComponent implements OnInit {
  postAdForm!: FormGroup;
  adCardPreview: IAd = {
    id: 0,
    author: 0,
    title: "Ad preview title",
    description: "A description of the ad. The more precise the better !",
    category: 0,
    price: 0,
    publicationDate: new Date(),
  };
  conditions: ICondition[] = [];
  categories: ICategory[] = [];
  userSubmitted!:boolean;

  constructor (private formBuilder: FormBuilder, 
                private adService: AdService, 
                private conditionService: ConditionService,
                private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getCategories();
    this.getConditions();

    this.postAdForm = this.formBuilder.group({
      title: [null, [Validators.required, Validators.minLength(8)]],
      price: [null, Validators.required],
      description: [null, [Validators.required, Validators.minLength(10)]],
      category: [null, Validators.required],
      condition: [null, '']
    });

    this.postAdForm.get('title')?.valueChanges.subscribe( (value: string) => this.adCardPreview.title = value);
    this.postAdForm.get('description')?.valueChanges.subscribe( (value: string) => this.adCardPreview.description = value);
    this.postAdForm.get('price')?.valueChanges.subscribe( (value: number) => this.adCardPreview.price = value);
    this.postAdForm.get('condition')?.valueChanges.subscribe( (value: number) => this.adCardPreview.condition = value);
    this.postAdForm.get('category')?.valueChanges.subscribe( (value: number) => this.adCardPreview.category = value);
   
  }

  onSubmit() {
    this.userSubmitted = true;
    const alertDanger =  document.getElementById('form-invalid-alert');
    if (this.postAdForm.valid) {
            this.postAdForm.reset();
            this.userSubmitted = false;
            alertDanger?.classList.add('hidden');
    } else {
      alertDanger?.classList.remove('hidden');
      alertDanger?.classList.add('show');
    }
  }

  getConditions(): void {
    this.conditionService.getConditions().subscribe({
      next: (res) => this.conditions = res,
      error: (err) => console.log(err)
    });
  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (res) => this.categories = res,
      error: (err) => console.log(err)
    });
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
