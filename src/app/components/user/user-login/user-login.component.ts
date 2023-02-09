import { Component, ComponentRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CustomAlertComponent } from 'src/app/components/custom-alert/custom-alert.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  loginForm!: FormGroup;
  userSubmitted!:boolean;

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

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
    this.userSubmitted = true;    
    // console.log(this.loginForm);
    // console.log(this.loginForm.value);
    if (this.loginForm.valid) {
      const token = this.authenticationService.authenticateUser(this.loginForm.value);
      if (token) {
        console.log('login succesfull');
        console.log(token);
        localStorage.setItem('token', token.name);
        this.userSubmitted = false;
        this.loginForm.reset();
        this.router.navigate(['/']);
      } else {
        this.throwAlert();
        console.log('name password mismatch');
      }
    } else {
      this.throwAlert();
      console.log('form invalid');
    }
  }

  /**
   * The lines below allows for the custom-alert component to appear and disappear
   */
  @ViewChild("viewContainerRef", { read: ViewContainerRef }) vcr!: ViewContainerRef;
  ref!: ComponentRef<CustomAlertComponent>

  throwAlert() {
    this.ref = this.vcr.createComponent(CustomAlertComponent);
  }

  /**
   * Getter methods for form controls
   */
  get name() { return this.loginForm.get('name'); }
  get password() { return this.loginForm.get('password'); }
}
