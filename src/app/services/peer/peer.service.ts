import { Injectable } from '@angular/core';
import { MediaConnection, Peer, PeerEvents } from 'peerjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeerService {
  private peer: Peer;
  constructor() {
    this.peer = new Peer();
  }

  onCall(): Observable<MediaConnection> {
    return new Observable<MediaConnection>(observer => {
      this.peer.on('call', (call: MediaConnection) => {
        observer.next(call);
      });
      return () => this.peer.off('call');
    });

  }

  onOpen(): Observable<string> {
    return new Observable<string>((observer) => {
      this.peer.on('open', (id: string) => {
        observer.next(id);
      });
      return () => this.peer.off('open');
    });
  }

  onClose(): Observable<void> {
    return new Observable<void>((observer) => {
      this.peer.on('close', () => {
        observer.next();
      });
      return () => this.peer.off('close');
    });
  }

  onError(): Observable<any> {
    return new Observable<any>((observer) => {
      this.peer.on('error', (error: any) => {
        observer.next(error);
      });
      return () => this.peer.off('error');
    });
  }

  onConnection(): Observable<any> {
    return new Observable<any>((observer) => {
      this.peer.on('connection', (conn: any) => {
        observer.next(conn);
      });
      return () => this.peer.off('connection');
    });
  }

  callToPeer(peerId: string, myStream: MediaStream, onStream: (stream: MediaStream) => void, onClose: () => void) {
    const conn = this.peer.call(peerId, myStream);
    conn.on('stream', (connStream) => {
      onStream(connStream);
    });
    conn.on('close', () => onClose());
  }

  connectToPeer(peerId: string): void {
    const conn = this.peer.connect(peerId);
    conn.on('open', () => {
      console.log('Connected to peer ' + peerId);
      conn.send('Hello from Angular!');
    });
  }

  listenForConnections(): void {
    this.peer.on('connection', (conn) => {
      console.log('Received connection from peer ' + conn.peer);
      conn.on('data', (data) => {
        console.log('Received data from peer: ' + data);
      });
    });
  }
}
