import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { switchMap, takeUntil, tap } from 'rxjs';
import { IUserResponseDto } from 'src/app/models/dtos/IUserResponseDto';
import { TokenService } from 'src/app/services/token/token.service';
import { UserService } from 'src/app/services/user/user.service';
import { Unsubscribe } from 'src/app/_helpers/_unscubscribe/unsubscribe';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent extends Unsubscribe implements OnInit {
  user = {} as IUserResponseDto

  constructor (private tokenService: TokenService,
              private userService: UserService,
              private router: Router) {
                super();
              }

  ngOnInit(): void {
    if (this.tokenService.isLogged()) {
      this.userService.getLoggedInUserId()
        .pipe(
          switchMap( userId => this.userService.getUser(parseInt(userId)).pipe(
            tap(data => this.user = data))
          ),
          takeUntil(this.unsubscribe$)
        )
        .subscribe();
    }
  }

  signOut(): void {
    this.tokenService.clearToken();
    this.router.navigate(['/']);
  }
}
