import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import io, { Socket } from 'socket.io-client';

@Injectable()
export class SocketService {
  public anotherId = new BehaviorSubject(null);
  public socket: Socket;

  constructor() {
    this.socket = io('localhost:3000');
    this.hanleUserConnected();
  }

  public joinRoom(roomId: string, userId: string): void {
    this.socket.emit('join-room', roomId, userId);
  }

  public hanleUserConnected(): void {
    this.socket.on('user-connected', userId => {
      this.anotherId.next(userId);
    })
    // this.socket.on('disconnected')
  }
}