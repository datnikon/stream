import { Injectable } from '@angular/core';
import { SocketService } from './socket.service';
declare var Peer: any;
@Injectable({
  providedIn: 'root'
})
export class PeerService {
  public peer;
  public localMediaStream: MediaStream;
  constructor(private socket: SocketService) {

  }

  initPeer(stream: MediaStream): void {
    this.peer = new Peer(undefined, {
      host: '/',
      port: '3001'
    });
    this.localMediaStream = stream;
    this.openPeer();
  }

  openPeer(): void {
    this.peer.on('open', id => {
      this.socket.joinRoom(id)
    })
  }

  makeCall(userId: string): void {
    this.peer.call(userId, this.localMediaStream);
  }

}
