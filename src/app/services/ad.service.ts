import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAd } from '../models/IAd.interface';
import { Ad } from '../models/ad';
import { environment } from '../environments/environment';
import { IAdResponseDto } from '../models/dtos/IadResponseDto';
import { IAdRequestDto } from '../models/dtos/IAdRequestDto';

@Injectable({
  providedIn: 'root'
})
export class AdService {
  
  private url: string = "Ads";

  constructor(private http: HttpClient) { }

  public getAllAds(): Observable<IAdResponseDto[]> {
    return this.http.get<IAdResponseDto[]>(`${environment.apiUrl}/${this.url}`);
  }

  public getAd(id: number): Observable<IAdResponseDto> {
    return this.http.get<IAdResponseDto>(`${environment.apiUrl}/${this.url}/${id}`);
  }

  public postAd(ad: IAdRequestDto): Observable<IAdRequestDto> {
    return this.http.post<IAdRequestDto>(`${environment.apiUrl}/${this.url}`, ad);
  }
}


