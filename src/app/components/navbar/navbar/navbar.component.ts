import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  loggedinUser!: string;
  
  userSignedIn() {
    this.loggedinUser = localStorage.getItem('authToken') as string;
    return this.loggedinUser;
  }

  signOut(): void {
    localStorage.removeItem('authToken');
  }

}
