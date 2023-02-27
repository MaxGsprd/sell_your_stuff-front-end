import { Component } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  loggedinUser!: string;

  constructor (private tokenService: TokenService) {}
  
  userSignedIn() {
    
    if (this.tokenService.isLogged()) {
      this.loggedinUser = "Gloubiste !";
      return true;
    } else {
      return false;
    }
  }

  signOut(): void {
    this.tokenService.clearToken();
  }

}
