import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, AbstractControl, ValidationErrors, FormBuilder } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {
  registrationForm!: FormGroup;
  user!: User;
  userSubmitted!:boolean;

  constructor(private formBuilder: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
    this.createRegistrationForm();
  }

  createRegistrationForm(): void {
    this.registrationForm = this.formBuilder.group({
      name: [null, Validators.required],
      birthdate: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      phone: [null, Validators.required],
      password: [null, [Validators.required, Validators.minLength(8)]],
      confirmPassword: [null, Validators.required]
    },
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

      this.userService.registerUser(this.userData());
      this.registrationForm.reset();
      this.userSubmitted = false;

      alertDanger?.classList.add('hidden');
      alertSuccess?.classList.remove('hidden');
      alertSuccess?.classList.add('show');

      formCard?.classList.add('hidden');
      welcomeBanner?.classList.remove('hidden')
    } else {
      alertDanger?.classList.remove('hidden');
      alertDanger?.classList.add('show');
    }
  }

  /**
   * This method maps form submitted values into user model
   * @returns user model
   */
  userData(): User {
    return this.user = {
      name: this.name?.value,
      birthdate: this.birthdate?.value,
      email: this.email?.value,
      phone: this.phone?.value,
      password: this.password?.value
    }
  }
  
  passwordMatchingValidator(control: AbstractControl): ValidationErrors | null {
    return control.get('password')?.value === control.get('confirmPassword')?.value ? null : { passwordsMismatch : true};
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
