import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { IMessage } from '../models/IMessage.interface';
import { IMessageResponse } from '../models/dtos/IMessageResponseDto';
import { IMessageRequest } from '../models/dtos/IMessageRequestDto';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  
  private url: string = "Messages";

  constructor(private http: HttpClient) { }

  public getAllMessages(): Observable<IMessageResponse[]> {
    return this.http.get<IMessageResponse[]>(`${environment.apiUrl}/${this.url}`);
  }

  public getMessage(id: number): Observable<IMessageResponse> {
    return this.http.get<IMessageResponse>(`${environment.apiUrl}/${this.url}/${id}`);
  }

  public getMessagesReceivedByUser(id: number) :Observable<IMessageResponse[]> {
    return this.http.get<IMessageResponse[]>(`${environment.apiUrl}/${this.url}/receivedByUser/${id}`);
  }

  public getMessagesSentByUser(id: number) :Observable<IMessageResponse[]> {
    return this.http.get<IMessageResponse[]>(`${environment.apiUrl}/${this.url}/sentByUser/${id}`);
  }

  public postMessage(message: IMessageRequest): Observable<IMessageRequest> {
    return this.http.post<IMessageRequest>(`${environment.apiUrl}/${this.url}`, message);
  }

  public deleteMessage(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/${this.url}/${id}`);
  }

}
