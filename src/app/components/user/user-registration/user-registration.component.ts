import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {
  registrationForm!: FormGroup;
  user: any = {};

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createRegistrationForm();
  }

  createRegistrationForm() {
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
    console.log(this.registrationForm);
    this.user = Object.assign(this.user, this.registrationForm.value);
    this.addUser(this.user);
    this.registrationForm.reset();
  }
  
  passwordMatchingValidator(formGroup: AbstractControl): ValidationErrors | null {
    return formGroup.get('password')?.value === formGroup.get('confirmPassword')?.value ? null : { passwordsMismatch : true};
  }

  addUser(user: any) {
    let users = [];
    if (localStorage.getItem('Users')) {
      users = JSON.parse(localStorage.getItem('Users') as string);
      users = [user,...users];
    } else {
      users = [user];
    }
    localStorage.setItem('Users', JSON.stringify(users));
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
