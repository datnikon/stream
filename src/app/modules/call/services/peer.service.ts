import { Injectable } from '@angular/core';
declare var Peer: any;
import Utils from 'src/app/utils/utils';
@Injectable({
  providedIn: 'root'
})
export class PeerService {
  public peer;
  public conn;
  public call;
  public myPeerId = Utils.genRoomId();
  constructor() {
    console.log("MY ID", this.myPeerId);
  }

  initPeer(): void {

    this.peer = new Peer(this.myPeerId);
  }

  makeCall(amotherid: string, stream: MediaStream): void {
    this.call = this.peer.call(amotherid, stream);
  }

}
