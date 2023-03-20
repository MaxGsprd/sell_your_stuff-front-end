import { Component, OnInit} from '@angular/core';
import { FormGroup, Validators, FormBuilder} from '@angular/forms';
import { AdService } from 'src/app/services/ad/ad.service';
import { ConditionService } from 'src/app/services/condition/condition.service';
import { CategoryService } from 'src/app/services/category/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IAdRequestDto } from 'src/app/models/dtos/IAdRequestDto';
import { Category } from 'src/app/models/category';
import { Condition } from 'src/app/models/condition';
import { Unsubscribe } from 'src/app/_helpers/_unscubscribe/unsubscribe';
import { takeUntil } from 'rxjs';
import { TokenService } from 'src/app/services/token/token.service';
import { IUser } from 'src/app/models/IUser';
    
@Component({
  selector: 'app-post-ad',
  templateUrl: './post-ad.component.html',
  styleUrls: ['./post-ad.component.css']
})
export class PostAdComponent extends Unsubscribe implements OnInit {
  postAdForm!: FormGroup;
  adCardPreview: any = 
  {
    id: 0,
    user: {} as IUser,
    title: "Ad preview title",
    description: "A description of the ad. The more precise the better !",
    category: {} as Category,
    condition: {} as Condition,
    price: 0,
    publicationDate: new Date(),
    photos: []
  };
  conditions: Condition[] = [];
  categories: Category[] = [];
  userSubmitted!:boolean;
  adImagePreview: any;

  constructor (private formBuilder: FormBuilder, 
                private adService: AdService, 
                private conditionService: ConditionService,
                private categoryService: CategoryService,
                private router: Router,
                private tokenService: TokenService,
                private toastr: ToastrService,
                private route: ActivatedRoute) { 
                  super();
                }

  ngOnInit(): void {
    this.getCategories();
    this.getConditions();
    this.getUser();

    this.postAdForm = this.formBuilder.group({
      title: [null, [Validators.required, Validators.minLength(8)]],
      price: [null, Validators.required],
      description: [null, [Validators.required, Validators.minLength(10)]],
      category: [null, Validators.required],
      condition: [null, '']
    });

    this.postAdForm.get('title')?.valueChanges.subscribe((value: string) => this.adCardPreview.title = value);
    this.postAdForm.get('description')?.valueChanges.subscribe((value: string) => this.adCardPreview.description = value);
    this.postAdForm.get('price')?.valueChanges.subscribe((value: number) => this.adCardPreview.price = Math.round(value));
    this.postAdForm.get('category')?.valueChanges.subscribe((value: number) => this.adCardPreview.category = this.categories[value-1]);
    this.postAdForm.get('condition')?.valueChanges.subscribe((value: number) => this.adCardPreview.condition = this.conditions[value-1]);
  }

  onSubmit() {
    this.userSubmitted = true;
    const alertDanger =  document.getElementById('form-invalid-alert');
    if (this.postAdForm.valid) {
      let newAd = this.postAdFormToDto(this.postAdForm.value);

      this.adService.postAd(newAd)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(res => this.router.navigate([`/edit-photo-gallery/${res.id}`]));

      this.toastr.success('Congratulations, your ad has been pusblished.', 'Thank you !');
    } else {
      alertDanger?.classList.remove('hidden');
      alertDanger?.classList.add('show');
    }
  }

  getConditions(): void {
    this.conditionService.getConditions()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(res => this.conditions = res);
  }

  getCategories(): void {
    this.categoryService.getCategories()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(res => this.categories = res);
  }

  postAdFormToDto(formValues: any): IAdRequestDto {
    let adDto = {} as IAdRequestDto;
    Object.assign(adDto, formValues);
    adDto.id = 0;
    adDto.categoryId = parseInt(formValues.category)
    adDto.conditionId = parseInt(formValues.condition)
    adDto.publicationDate = new Date();
    adDto.price = Math.round(formValues.price);
    if (this.adCardPreview.user.id) {
      adDto.userId = this.adCardPreview.user.id;
    }
    return adDto;
  }

  getUser() {
    const routeParams = this.route.snapshot.paramMap;
    const userId = Number(routeParams.get('id'));
    if (userId) {
      if (this.tokenService.isLogged()) {
        const userData = this.tokenService.getUserNameAndId();
        if (userData.id != userId.toString()) {
           this.router.navigate(['/'])
        } else {
          this.adCardPreview.user.name = userData.name;
          this.adCardPreview.user.id = +userData.id;
        }
      }
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
