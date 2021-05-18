import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import io, { Socket } from 'socket.io-client';

@Injectable()
export class SocketService {
  public joinId = new BehaviorSubject(null);
  public leaveId = new BehaviorSubject(null);
  public newMessage = new BehaviorSubject(null);
  public socket: Socket;

  constructor() {
    this.socket = io('https://live.datnikon.com/', { path: '/socket' });
    this.hanleUserConnect();
    this.handleNewMessage();
  }

  public joinRoom(roomId: string, userId: string): void {
    this.socket.emit('join-room', roomId, userId);
  }

  public chat(content: string): void {
    this.socket.emit('chat', content);
  }

  private hanleUserConnect(): void {
    this.socket.on('user-connected', userId => {
      this.joinId.next(userId);
    })
    this.socket.on('user-disconnected', userId => {
      this.leaveId.next(userId);
    })
  }

  private handleNewMessage(): void {
    this.socket.on('new-message', (content) => {
      this.newMessage.next(content);
    })
  }
}