import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import io, { Socket } from 'socket.io-client';

@Injectable()
export class SocketService {
  public joinedId = new BehaviorSubject(null);
  public leavedId = new BehaviorSubject(null);
  public newMessage = new BehaviorSubject(null);
  public socket: Socket;

  constructor() {
    this.socket = io('localhost:3000', { path: '/socket' }); //https://live.datnikon.com/
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
      this.joinedId.next(userId);
    })
    this.socket.on('user-disconnected', userId => {
      this.leavedId.next(userId);
    })
  }

  private handleNewMessage(): void {
    this.socket.on('new-message', (content) => {
      this.newMessage.next(content);
    })
  }
}