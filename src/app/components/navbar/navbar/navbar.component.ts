import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/models/IUser';
import { TokenService } from 'src/app/services/token/token.service';
import { Unsubscribe } from 'src/app/_helpers/_unscubscribe/unsubscribe';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent extends Unsubscribe implements OnInit {
  user?: IUser = {} as IUser;

  constructor (private tokenService: TokenService,
               private router: Router) {
                super();
              }

  ngOnInit(): void {
    if (this.tokenService.isLogged()) {
      this.user = this.tokenService.getUserNameAndId();
    }
  }

  signOut(): void {
    this.tokenService.clearUserData();
    this.router.navigate(['/']);
  }

}
