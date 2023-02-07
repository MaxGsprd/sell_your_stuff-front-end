import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAd } from '../components/ads/IAd.interface';

@Injectable({
  providedIn: 'root'
})
export class AdsService {

  constructor(private http: HttpClient) { }

  public getAllAds() :Observable<IAd[]>
  {
    return this.http.get<IAd[]>('data/mock-items.json');
  }
}


