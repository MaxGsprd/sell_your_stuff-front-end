import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUserResponseDto } from 'src/app/models/dtos/IUserResponseDto';
import { TokenService } from 'src/app/services/token/token.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user = {} as IUserResponseDto

  constructor (private tokenService: TokenService, private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    if (this.tokenService.isLogged()) {
      this.userService.getLoggedInUserId().subscribe({
        next: (res) =>  {
            this.userService.getUser(parseInt(res)).subscribe((data) => {
            this.user = data;
          })
        },
        error: (err) => console.error(err)
      });
    }
  }

  signOut(): void {
    this.tokenService.clearToken();
    this.router.navigate(['/']);
  }
}
