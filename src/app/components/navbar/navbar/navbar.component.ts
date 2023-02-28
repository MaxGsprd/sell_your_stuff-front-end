import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  loggedinUser!: string;

  constructor (private tokenService: TokenService, private userService: UserService) {}

  ngOnInit(): void {
    if (this.tokenService.isLogged()) {
      this.userService.getLoggedInUserId().subscribe({
        next: (res) =>  {
          this.userService.getUser(parseInt(res)).subscribe(data => this.loggedinUser = data.name)
        },
        error: (err) => console.error(err)
      });
    }
  }

  userSignedIn() {
    return this.loggedinUser != null ? true : false;
  }

  signOut(): void {
    this.tokenService.clearToken();
  }
}
