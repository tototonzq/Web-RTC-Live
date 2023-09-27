// socket.service.ts
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  constructor(private socket: Socket) {}

  connect() {
    this.socket.connect();
  }

  disconnect() {
    this.socket.disconnect();
  }

  emitEvent(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }

  onEvent(eventName: string) {
    return this.socket.fromEvent(eventName);
  }
}
