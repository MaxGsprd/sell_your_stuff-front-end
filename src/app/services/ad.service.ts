import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAd } from '../models/IAd.interface';
import { Ad } from '../models/ad';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdService {
  
  private url: string = "Ads";

  constructor(private http: HttpClient) { }

  public getAllAds() :Observable<IAd[]> {
    return this.http.get<IAd[]>(`${environment.apiUrl}/${this.url}`);
  }

  public getAd(id: number) :Observable<IAd> {
    return this.http.get<IAd>(`${environment.apiUrl}/${this.url}/${id}`);
  }

  public postAd(ad: Ad) {
    window.alert('feature à implémenter !');
  }
}


