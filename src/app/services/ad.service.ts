import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { IAdResponseDto } from '../models/dtos/IAdResponseDto';
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

  public updateAd(ad: IAdRequestDto) :Observable<IAdRequestDto> {
    return this.http.patch<IAdRequestDto>(`${environment.apiUrl}/${this.url}`, ad);
  }

  public deleteAd(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/${this.url}/${id}`);
  }

  public uploadImage(inputData: any) {
    return this.http.post<IAdRequestDto>(`${environment.apiUrl}/${this.url}/uploadImage`, inputData);
  }

  public removeImage(id: number) {
    // return this.http.delete<IAdRequestDto>(`${environment.apiUrl}/${this.url}/uploadImage`, inputData);
  }
}


