import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Condition } from '../../models/condition';

@Injectable({
  providedIn: 'root'
})
export class ConditionService {

  private url: string = "Conditions";

  constructor(private http: HttpClient) { }

  public getConditions(): Observable<Condition[]> {
    return this.http.get<Condition[]>(`${environment.apiUrl}/${this.url}`);
  }
}
