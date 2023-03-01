import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { IMessage } from '../models/IMessage.interface';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  
  private url: string = "Messages";

  constructor(private http: HttpClient) { }

  public getAllMessages(): Observable<IMessage[]> {
    return this.http.get<IMessage[]>(`${environment.apiUrl}/${this.url}`);
  }

  public getMessage(id: number): Observable<IMessage> {
    return this.http.get<IMessage>(`${environment.apiUrl}/${this.url}/${id}`);
  }

  public getMessagesReceivedByUser(id: number) :Observable<IMessage[]> {
    return this.http.get<IMessage[]>(`${environment.apiUrl}/${this.url}/receivedByUser/${id}`);
  }

  public getMessagesSentByUser(id: number) :Observable<IMessage[]> {
    return this.http.get<IMessage[]>(`${environment.apiUrl}/${this.url}/sentByUser/${id}`);
  }

  public postMessage(message: IMessage): Observable<IMessage> {
    return this.http.post<IMessage>(`${environment.apiUrl}/${this.url}`, message);
  }

  public deleteMessage(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/${this.url}/${id}`);
  }

}
