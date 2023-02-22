import { Injectable } from '@angular/core';
import { IUser } from '../models/IUser.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { IUserResponseDto } from '../models/dtos/IUserResponseDto';
import { IUserRequestDto } from '../models/dtos/IUserRequestDto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private url: string = "Users";

  constructor(private http: HttpClient) { }

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

  public getAllUsers(): Observable<IUserResponseDto[]> {
    return this.http.get<IUserResponseDto[]>(`${environment.apiUrl}/${this.url}`);
  }

  public getUser(id: number): Observable<IUserResponseDto> {
    return this.http.get<IUserResponseDto>(`${environment.apiUrl}/${this.url}/${id}`);
  }

  public postUser(user: IUserRequestDto): Observable<IUserRequestDto> {
    return this.http.post<IUserRequestDto>(`${environment.apiUrl}/${this.url}`, user);
  }

  public updateUser(user: IUserRequestDto) :Observable<IUserRequestDto> {
    return this.http.patch<IUserRequestDto>(`${environment.apiUrl}/${this.url}`, user);
  }

  public deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/${this.url}/${id}`);
  }



}
