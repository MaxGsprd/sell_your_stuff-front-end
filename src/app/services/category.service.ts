import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { ICategory } from '../models/ICategory.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private url: string = "Categories";

  constructor(private http: HttpClient) { }

  public getCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(`${environment.apiUrl}/${this.url}`);
  }
}
