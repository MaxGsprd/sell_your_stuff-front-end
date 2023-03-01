import { Component, ComponentRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomAlertComponent } from 'src/app/components/custom-alert/custom-alert.component';
import { UserService } from 'src/app/services/user.service';
import { IUserLoginDto } from 'src/app/models/dtos/IUserLoginDto';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  loginForm!: FormGroup;
  userSubmitted!:boolean;

  constructor(private userService: UserService, private tokenService: TokenService, private router: Router) { }

  ngOnInit(): void {

    if(this.tokenService.isLogged()) this.router.navigate(['/']);
    this.loginForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
    });
  }

  onLogin(): void {
    this.userSubmitted = true;    

    if (this.loginForm.valid) {
      let loginValues = {} as IUserLoginDto;
      Object.assign(loginValues, this.loginForm.value);

      this.userService.userLogin(loginValues).subscribe({
        next: (token) => {
            this.tokenService.saveToken(token);
            window.location.reload();
        },
        error: (err) => {
          console.log(err)
          this.throwAlert();
        }
      });
      this.userSubmitted = false;
    } else {
      this.throwAlert();
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
