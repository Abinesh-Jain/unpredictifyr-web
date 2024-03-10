import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {

  private socket: any;

  constructor() {
    this.socket = io('http://localhost:3000');
  }

  // Emit an event to the server
  emit(event: string, data?: any) {
    this.socket.emit(event, data);
  }

  // Listen for events from the server
  onEvent(event: string): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on(event, (data: any) => {
        observer.next(data);
      });
    });
  }
}
