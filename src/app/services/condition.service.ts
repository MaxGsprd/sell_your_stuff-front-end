import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { ICondition } from '../models/ICondition.interface';

@Injectable({
  providedIn: 'root'
})
export class ConditionService {

  private url: string = "Conditions";

  constructor(private http: HttpClient) { }

  public getConditions(): Observable<ICondition[]> {
    return this.http.get<ICondition[]>(`${environment.apiUrl}/${this.url}`);
  }
}
