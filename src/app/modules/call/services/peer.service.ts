import { Injectable } from '@angular/core';
import { SocketService } from './socket.service';
declare var Peer: any;
@Injectable({
  providedIn: 'root'
})
export class PeerService {
  public peer;
  constructor(private socket: SocketService) {

  }

  initPeer(): void {
    this.peer = new Peer(undefined, {
      host: '/',
      port: '3001'
    });
    this.openPeer();
  }

  openPeer(): void {
    this.peer.on('open', id => {
      this.socket.joinRoom(id)
    })
  }

}
