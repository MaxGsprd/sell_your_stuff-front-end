import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  authenticateUser(user: any) {
    let userArray = [];
    if (localStorage.getItem('Users')) {
      userArray = JSON.parse(localStorage.getItem('Users') as string);
    }
    return userArray.find((submittedValues: { name: any; password: any; }) => submittedValues.name === user.name && submittedValues.password === user.password);
  }
}
