import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {
  registrationForm!: FormGroup;

  ngOnInit() {
    this.registrationForm = new FormGroup({
      name: new FormControl( null, Validators.required),
      birthdate: new FormControl( null, Validators.required),
      email: new FormControl( null, [Validators.required, Validators.email]),
      phone: new FormControl( null, Validators.required),
      password: new FormControl( null, [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl( null, Validators.required),
    },
    this.passwordMatchingValidator);
  }

  onSubmit() {
    console.log(this.registrationForm);
  }
  
  passwordMatchingValidator(formGroup: AbstractControl): ValidationErrors | null {
    return formGroup.get('password')?.value === formGroup.get('confirmPassword')?.value ? null : { passwordsMismatch : true};
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
