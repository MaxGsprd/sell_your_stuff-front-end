import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token/token.service';
import { Unsubscribe } from 'src/app/_helpers/_unscubscribe/unsubscribe';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent extends Unsubscribe implements OnInit {
  userId?: string | undefined | null;
  userName?: string | undefined | null;

  constructor (private tokenService: TokenService,
               private router: Router) {
                super();
              }

  ngOnInit(): void {
    if (this.tokenService.isLogged()) {
      this.retreiveUserId();
      this.retreiveUserName();
    }
  }

  signOut(): void {
    this.tokenService.clearUserData();
    this.router.navigate(['/']);
  }

  retreiveUserId(): void {
    const localStorageUid = this.tokenService.getUserId();
    if (localStorageUid != null && localStorageUid != undefined) {
      this.userId = localStorageUid;
    }
  }

  retreiveUserName(): void {
    const localStorageUserName = this.tokenService.getUserName();
    if (localStorageUserName != null && localStorageUserName != undefined) {
      this.userName = localStorageUserName;
    }
  }
}
