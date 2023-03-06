import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs';
import { IUserRequestDto } from 'src/app/models/dtos/IUserRequestDto';
import { IUser } from 'src/app/models/IUser.interface';
import { UserService } from 'src/app/services/user.service';
import { Unsubscribe } from 'src/app/_helpers/_unscubscribe/unsubscribe';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent extends Unsubscribe implements OnInit, OnDestroy {

  user: IUser = {} as IUser;
  userEditionForm!: FormGroup;
  userSubmitted!:boolean;

  constructor(private route: ActivatedRoute, 
              private userService: UserService,
              private formBuilder: FormBuilder,
              private toastr: ToastrService, 
              private router: Router) {
                super();
               }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const userId = Number(routeParams.get('id'));

    this.userService.getFullUser(userId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (res) => {
          this.user = res;
          this.userEditionForm.get('name')?.setValue(this.user.name);
          this.userEditionForm.get('birthDate')?.setValue(this.user.birthDate);
          this.userEditionForm.get('email')?.setValue(this.user.email);
          this.userEditionForm.get('phone')?.setValue(this.user.phone);
        },
        error: (err) => console.log(err)
    });

    this.userEditionForm = this.formBuilder.group({
      name: [this.user.name, Validators.required],
      birthDate: [this.user.birthDate, null],
      email: [this.user.email, null],
      phone: [this.user.phone, null],
      password: [null, [Validators.required, Validators.minLength(8)]],
      confirmPassword: [null, Validators.required]
    },
    {validators: this.passwordMatchingValidator});
  }

  onSubmit() {
    const alertDanger =  document.getElementById('form-invalid-alert');
    this.userSubmitted = true;

    if (this.userEditionForm.valid) {
      console.log(this.userEditionForm.value)
      let editedUser = this.userEditFormToDto(this.userEditionForm.value);
      this.userService.updateUser(editedUser)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe({
          next: (res) => {
            this.userEditionForm.reset();
            this.userSubmitted = false;
            this.router.navigate(['/myDashboard', res.id]);
            this.toastr.success('Congratulations, your profile has been updated.');
          },
          error: () => {
            const userNameTakenErrorDiv = document.getElementById('username-exist');
            userNameTakenErrorDiv?.classList.remove('hidden');
            userNameTakenErrorDiv?.classList.add('show');
          }
        });
    } else {
      alertDanger?.classList.remove('hidden');
      alertDanger?.classList.add('show');
    }
  }
  
  userEditFormToDto(formValues: Object): IUserRequestDto {
    let userDto = {} as IUserRequestDto;
    Object.assign(userDto, formValues);
    userDto.id = this.user.id;
    userDto.roleId = this.user.roleId;
    return userDto;
  }
   
  passwordMatchingValidator(control: AbstractControl): ValidationErrors | null {
    return control.get('password')?.value === control.get('confirmPassword')?.value ? null : { passwordsMismatch : true};
  }

  /**
   * Getter methods for form controls
   */
    get name() { return this.userEditionForm.get('name'); }
    get birthDate() { return this.userEditionForm.get('birthdate'); }
    get email() { return this.userEditionForm.get('email'); }
    get phone() { return this.userEditionForm.get('phone'); }
    get password() { return this.userEditionForm.get('password'); }
    get confirmPassword() { return this.userEditionForm.get('confirmPassword'); }
}
