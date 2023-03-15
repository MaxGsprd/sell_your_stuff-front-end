import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IAdRequestDto } from '../../models/dtos/IAdRequestDto';
import { IAd } from 'src/app/models/IAd';

@Injectable({
  providedIn: 'root'
})
export class AdService {
  
  private url: string = "Cl-Ad";

  constructor(private http: HttpClient) { }

  public getAllAds(): Observable<IAd[]> {
    return this.http.get<IAd[]>(`${environment.apiUrl}/${this.url}`);
  }

  public getAd(id: number): Observable<IAd> {
    return this.http.get<IAd>(`${environment.apiUrl}/${this.url}/${id}`);
  }

  public getAdByUser(id: number) :Observable<IAd[]> {
    return this.http.get<IAd[]>(`${environment.apiUrl}/${this.url}/byUser/${id}`);
  }

  public postAd(ad: IAdRequestDto): Observable<IAdRequestDto> {
    return this.http.post<IAdRequestDto>(`${environment.apiUrl}/${this.url}`, ad);
  }

  public updateAd(ad: IAdRequestDto) :Observable<IAdRequestDto> {
    return this.http.put<IAdRequestDto>(`${environment.apiUrl}/${this.url}/${ad.id}`, ad);
  }

  public deleteAd(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/${this.url}/${id}`);
  }

  public setPrimaryPhoto(adId: number, publicId: string) : Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}/${this.url}/setPrimaryPhoto/${adId}/${publicId}`,{});
  }

  public deletePhoto(adId: number, publicId: string) : Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/${this.url}/deletePhoto/${adId}/${publicId}`);
  }

}


