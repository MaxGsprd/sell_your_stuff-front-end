import { Component, OnInit} from '@angular/core';
import { FormGroup, Validators, FormBuilder} from '@angular/forms';
import { AdService } from 'src/app/services/ad.service';
import { ConditionService } from 'src/app/services/condition.service';
import { CategoryService } from 'src/app/services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IAdRequestDto } from 'src/app/models/dtos/IAdRequestDto';
import { IUserResponseDto } from 'src/app/models/dtos/IUserResponseDto';
import { Category } from 'src/app/models/category';
import { Condition } from 'src/app/models/condition';
import { UserService } from 'src/app/services/user.service';
    
@Component({
  selector: 'app-post-ad',
  templateUrl: './post-ad.component.html',
  styleUrls: ['./post-ad.component.css']
})
export class PostAdComponent implements OnInit {
  postAdForm!: FormGroup;
  adCardPreview: any = 
  {
    id: 0,
    user: {} as IUserResponseDto,
    title: "Ad preview title",
    description: "A description of the ad. The more precise the better !",
    category: 0,
    condition: 0,
    price: 0,
    publicationDate: new Date(),
    images: []
  };
  conditions: Condition[] = [];
  categories: Category[] = [];
  userSubmitted!:boolean;

  adImagePreview: any;
  imageUploadTest: any;

  constructor (private formBuilder: FormBuilder, 
                private adService: AdService, 
                private conditionService: ConditionService,
                private userService: UserService,
                private categoryService: CategoryService,
                private router: Router,
                private toastr: ToastrService,
                private route: ActivatedRoute) { }

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
    this.postAdForm.get('price')?.valueChanges.subscribe((value: number) => this.adCardPreview.price = value);
    this.postAdForm.get('category')?.valueChanges.subscribe((value: number) => this.adCardPreview.category = this.categories[value-1]);
    this.postAdForm.get('condition')?.valueChanges.subscribe((value: number) => this.adCardPreview.condition = this.conditions[value-1]);
  }

  onSubmit() {
    this.userSubmitted = true;
    const alertDanger =  document.getElementById('form-invalid-alert');
    if (this.postAdForm.valid) {
            // console.log(this.postAdForm);
            // console.log(newAd);
            let newAd = this.postAdFormToDto(this.postAdForm.value);
            this.adService.postAd(newAd).subscribe({
              next: (res) => {
                if (this.imageUploadTest) {
                  let formData = new FormData();
                  formData.append("file",this.imageUploadTest, String(res.id));
                  this.adService.uploadImage(formData).subscribe();
                }
              },
              error: (err) => console.log(err)
            });
            this.postAdForm.reset();
            alertDanger?.classList.add('hidden');
            this.userSubmitted = false;
            this.router.navigate(['/']);
            window.setTimeout(() => {window.location.reload()}, 1000)
            this.toastr.success('Congratulations, your ad has been pusblished.', 'Thank you !');
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

  getImg(event:any) {
    this.adCardPreview.images.push(event.target.files[0]);
    this.adImagePreview = `assets/images/${event.target.files[0].name}`;
    Array.from(event.target.files).forEach(file => this.adCardPreview.images.push(file));
    this.imageUploadTest = event.target.files[0];
  }

  postAdFormToDto(formValues: any): IAdRequestDto {
    let adDto = {} as IAdRequestDto;
    Object.assign(adDto, formValues);
    adDto.id = 0;
    adDto.categoryId = parseInt(formValues.category)
    adDto.conditionId = parseInt(formValues.condition)
    adDto.publicationDate = new Date();
    adDto.userId = this.adCardPreview.user.id;
    adDto.addressId = 1;  //@ to be changed with connect USER ADDRESS ID
    adDto.Image = this.adCardPreview.images; 
    return adDto;
  }

  getUser() {
    const routeParams = this.route.snapshot.paramMap;
    const userId = Number(routeParams.get('id'));

    if (userId) {
      this.userService.getUser(userId).subscribe({
        next: (res) => {
          this.adCardPreview.user.name = res.name
          this.adCardPreview.user.id = res.id
        }
      });
    }
  }

  refreshPage() {
    window.setTimeout(() => {this.router.navigate(['/'])}, 500);
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
