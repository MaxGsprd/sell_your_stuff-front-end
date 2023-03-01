import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, AbstractControl, ValidationErrors, FormBuilder } from '@angular/forms';
import { Address } from 'src/app/models/address';
import { IUserRequestDto } from 'src/app/models/dtos/IUserRequestDto';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {
  registrationForm!: FormGroup;
  userSubmitted!:boolean;

  constructor(private formBuilder: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      name: [null, Validators.required],
      birthdate: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      phone: [null, Validators.required],
      password: [null, [Validators.required, Validators.minLength(8)]],
      confirmPassword: [null, Validators.required]
    }
    ,
    {validators: this.passwordMatchingValidator});
  }

  onSubmit(): void {
    console.log(this.registrationForm); // to be removed
    const alertSuccess =  document.getElementById('form-valid-alert');
    const alertDanger =  document.getElementById('form-invalid-alert');
    this.userSubmitted = true;

    if (this.registrationForm.valid) {
      const formCard = document.getElementById('form-card');
      const welcomeBanner = document.getElementById('welcome-banner');
      let newUser = this.registrationFormToDto(this.registrationForm.value);
      this.userService.registerUser(newUser).subscribe({
        next: (res) => {
          // console.log(res)
          this.registrationForm.reset();
          this.userSubmitted = false;
          alertDanger?.classList.add('hidden');
          alertSuccess?.classList.remove('hidden');
          alertSuccess?.classList.add('show');
          formCard?.classList.add('hidden');
          welcomeBanner?.classList.remove('hidden')
        },
        error: (err) => {
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
  
  passwordMatchingValidator(control: AbstractControl): ValidationErrors | null {
    return control.get('password')?.value === control.get('confirmPassword')?.value ? null : { passwordsMismatch : true};
  }

  registrationFormToDto(formValues: any): IUserRequestDto {
    let userDto = {} as IUserRequestDto;
    Object.assign(userDto, formValues);
    userDto.id = 0;
    userDto.roleId = 2; //roleId 2 = user role
    return userDto;
  }

  /**
   * Getter methods for form controls
   */
  get name() { return this.registrationForm.get('name'); }
  get birthdate() { return this.registrationForm.get('birthdate'); }
  get email() { return this.registrationForm.get('email'); }
  get phone() { return this.registrationForm.get('phone'); }
  get password() { return this.registrationForm.get('password'); }
  get confirmPassword() { return this.registrationForm.get('confirmPassword'); }
}
