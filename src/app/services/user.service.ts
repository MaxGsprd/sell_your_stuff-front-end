import { Injectable } from '@angular/core';
import { IUser } from '../models/Iuser';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  registerUser(user: IUser) {
    let users = [];
    if (localStorage.getItem('Users')) {
      users = JSON.parse(localStorage.getItem('Users') as string);
      users = [user,...users];
    } else {
      users = [user];
    }
    localStorage.setItem('Users', JSON.stringify(users));
  }
}
