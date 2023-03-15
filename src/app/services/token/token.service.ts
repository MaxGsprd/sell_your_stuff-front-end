import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/models/IUser';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private router: Router) { }

  saveUserData(data: string) :void {
    const userData = JSON.parse(data);
    localStorage.setItem('authToken', userData.token);
    localStorage.setItem('uId', userData.id);
    localStorage.setItem('username', userData.username);
    this.router.navigate(['/']);
  }

  isLogged(): boolean {
    const token = localStorage.getItem("authToken");
    return !! token; // return true if token != false
  }

 clearUserData(): void {
    localStorage.removeItem("authToken");
    localStorage.removeItem('uId');
    localStorage.removeItem('username');
    window.location.reload();
  }

  getToken(): string | null {
    return localStorage.getItem("authToken");
  }

  getUserNameAndId(): IUser {
    let userData = {} as IUser;
    if (localStorage.getItem("username") != null && localStorage.getItem("username") != undefined) {
      userData.name = localStorage.getItem("username");
    }
    if ( localStorage.getItem("uId") != null && localStorage.getItem("uId") != undefined) {
      userData.id = localStorage.getItem("uId");
    }
    return userData; 
  }
}
