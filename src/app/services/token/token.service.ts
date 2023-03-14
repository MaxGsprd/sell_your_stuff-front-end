import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private router: Router, private jwtHelper :JwtHelperService) { }

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
    window.location.reload();
  }

  getToken(): string | null {
    return localStorage.getItem("authToken");
  }

}
