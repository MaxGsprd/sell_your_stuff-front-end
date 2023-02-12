import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAd } from '../components/ads/IAd.interface';
import { Ad } from '../models/ad';

@Injectable({
  providedIn: 'root'
})
export class AdService {
  
  // private url: string = HOST.apiUrl;

  constructor(private http: HttpClient) { }

  public getAllAds() :Observable<IAd[]> {
    return this.http.get<IAd[]>('data/mock-items.json');
  }

  public getAd(id: number) :Observable<any> {
    return this.http.get<any>('https://localhost:7230/WeatherForecast');
  }

  public postAd(ad: Ad) {
    window.alert('feature à implémenter !');
  }
}


