import { Injectable } from '@angular/core';
import io, { Socket } from 'socket.io-client';
import Utils from 'src/app/utils/utils';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  public roomId = Utils.genRoomId();
  public socket: Socket;
  constructor() {
    this.socket = io('localhost:3000');
    this.hanleUserConnected();
  }

  public joinRoom(userId: string): void {
    this.socket.emit('join-room', this.roomId, userId);
  }

  public hanleUserConnected(): void {
    this.socket.on('user-connected', userId => {
      console.log('User ' + userId + ' connected');
    })
  }

}

export interface SignalMessage {
  callerId?: string
  calleeId?: string,
  msg?: string,
  roomName?: string
}
