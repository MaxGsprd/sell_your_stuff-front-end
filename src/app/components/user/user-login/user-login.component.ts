import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  loginForm!: FormGroup;
  userSubmitted!:boolean;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm(): void {
    this.loginForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
    });
  }

  onLogin(): void {
    console.log(this.loginForm);
    this.userSubmitted = true;
    if (this.loginForm.valid) {
      this.loginForm.reset();
      // this.authenticationService.authenticateUser(this.loginForm.value);
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
 * Getter methods for form controls
 */
get name() { return this.loginForm.get('name'); }
get password() { return this.loginForm.get('password'); }
}
