import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private url: string = "Categories";

  constructor(private http: HttpClient) { }

  public getCategories(): Observable<Array<Category>> {
    return this.http.get<Array<Category>>(`${environment.apiUrl}/${this.url}`);
  }
}
