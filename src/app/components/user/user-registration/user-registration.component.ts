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

  onSubmit() {
    console.log(this.registrationForm); // to be removed
    this.userSubmitted = true;
    if (this.registrationForm.valid) {
      this.userService.registerUser(this.userData());
      this.registrationForm.reset();
      this.userSubmitted = false;
      let alert =  document.getElementById('form-valid-alert');
      alert?.classList.remove('hidden');
      alert?.classList.add('show');
    } else {
      let alert =  document.getElementById('form-invalid-alert');
      alert?.classList.remove('hidden');
      alert?.classList.add('show');
    }
  }

  /**
   * Maps submitted form values to user model
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
