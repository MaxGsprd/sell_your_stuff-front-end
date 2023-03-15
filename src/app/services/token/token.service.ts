import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

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

  getUserId(): string | null {
    return localStorage.getItem("uId");
  }

  getUserName(): string | null {
    return localStorage.getItem("username");
  }

}
