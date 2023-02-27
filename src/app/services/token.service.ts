import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private router: Router) { }

  saveToken(token: string) :void {
    localStorage.setItem('authToken', token);
    this.router.navigate(['/']);
  }

  isLogged(): boolean {
    const token = localStorage.getItem("authToken");
    return !! token; // return true if token != false
  }

  clearToken(): void {
    localStorage.removeItem("authToken");
    this.router.navigate(['/']);
  }
}
