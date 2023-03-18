import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { takeUntil, tap } from 'rxjs';
import { Category } from 'src/app/models/category';
import { Condition } from 'src/app/models/condition';
import { IAdRequestDto } from 'src/app/models/dtos/IAdRequestDto';
import { IAd } from 'src/app/models/IAd';
import { AdService } from 'src/app/services/ad/ad.service';
import { CategoryService } from 'src/app/services/category/category.service';
import { ConditionService } from 'src/app/services/condition/condition.service';
import { TokenService } from 'src/app/services/token/token.service';
import { Unsubscribe } from 'src/app/_helpers/_unscubscribe/unsubscribe';

@Component({
  selector: 'app-edit-ad',
  templateUrl: './edit-ad.component.html',
  styleUrls: ['./edit-ad.component.css']
})
export class EditAdComponent extends Unsubscribe implements OnInit {

  ad!: IAd;
  adCardPreview = this.ad as IAd;
  conditions!: Condition[];
  categories!: Category[];
  editAdForm!: FormGroup;
  userSubmitted!: boolean;
  adImagePreview: any;
  imageToUpload: any;

  constructor(private route: ActivatedRoute,
              private adService: AdService,
              private conditionService: ConditionService,
              private toastr: ToastrService,
              private router: Router,
              private tokenService: TokenService,
              private formBuilder: FormBuilder,
              private categoryService: CategoryService) {
                super();
              }

  ngOnInit(): void {
    this.getCategories();
    this.getConditions();
    this.getAd();
    this.initEditForm();

    this.editAdForm.get('title')?.valueChanges.subscribe((value: string) => this.adCardPreview.title = value);
    this.editAdForm.get('description')?.valueChanges.subscribe((value: string) => this.adCardPreview.description = value);
    this.editAdForm.get('price')?.valueChanges.subscribe((value: number) => this.adCardPreview.price = value);
    this.editAdForm.get('category')?.valueChanges.subscribe((value: number) => this.adCardPreview.category = this.categories[value - 1]);
    this.editAdForm.get('condition')?.valueChanges.subscribe((value: number) => this.adCardPreview.condition = this.conditions[value - 1]);
  }

  initEditForm(): void {
    this.editAdForm = this.formBuilder.group({
      title: [this.ad?.title, [Validators.required, Validators.minLength(8)]],
      price: [this.ad?.price, Validators.required],
      description: [this.ad?.description, [Validators.required, Validators.minLength(10)]],
      category: [null, Validators.required],
      condition: [null, '']
    });
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


  getAd(): void {
    const routeParams = this.route.snapshot.paramMap;
    const adId = Number(routeParams.get('id'));

    this.adService.getAd(adId)
      .pipe(
          tap(res => {
            const userData = this.tokenService.getUserNameAndId();
            if (userData.id) {
              if (res.user.id != +userData.id) {
                this.router.navigate(['/']);
              }
            }
            this.ad = res;
            this.adCardPreview = this.ad;

            if (this.ad.photos && this.ad.photos.length > 0) {
              this.ad.photos.forEach(p => {
                if (p.isPrimary) this.adImagePreview = p.imageUrl;
              });
            }
            
            this.editAdForm.get('title')?.setValue(this.ad!.title);
            this.editAdForm.get('description')?.setValue(this.ad.description);
            this.editAdForm.get('price')?.setValue(this.ad.price);
            this.editAdForm.get('category')?.setValue(this.ad.category.id);
            this.editAdForm.get('condition')?.setValue(this.ad.condition.id);
            }
        ),
        takeUntil(this.unsubscribe$)
      )
      .subscribe();
  }

  getImg(event: any) {
    let selectedFile = event.target.files[0];
    if (selectedFile) {
      this.ad.photos = [];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.adImagePreview = e.target.result;
      };
      reader.readAsDataURL(selectedFile);
      this.imageToUpload = event.target.files[0];
    }
  }

  editAdFormToDto(formValues: any): IAdRequestDto {
    let adDto = {} as IAdRequestDto;
    Object.assign(adDto, formValues);
    adDto.id = this.ad.id;
    adDto.categoryId = parseInt(formValues.category)
    adDto.conditionId = parseInt(formValues.condition)
    adDto.publicationDate = new Date();
    adDto.addressId = 0;

    if (this.adCardPreview.user.id) {
      adDto.userId = this.adCardPreview.user.id;

    }
    return adDto;
  }

  onSubmit() {
    this.userSubmitted = true;
    const alertDanger = document.getElementById('form-invalid-alert');

    if (this.editAdForm.valid) {
      let newAd = this.editAdFormToDto(this.editAdForm.value);

      this.adService.updateAd(newAd)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe();

      this.editAdForm.reset();
      alertDanger?.classList.add('hidden');
      this.userSubmitted = false;
      window.setTimeout(() => { window.location.reload() }, 700)
      this.toastr.success('Congratulations, your ad has been edited.', 'Thank you !');
    } else {
      alertDanger?.classList.remove('hidden');
      alertDanger?.classList.add('show');
    }
  }

  /**
   * Getter methods for form controls
   */
  get title() { return this.editAdForm.get('title'); }
  get price() { return this.editAdForm.get('price'); }
  get description() { return this.editAdForm.get('description'); }
  get category() { return this.editAdForm.get('category'); }
  get condition() { return this.editAdForm.get('condition'); }
}