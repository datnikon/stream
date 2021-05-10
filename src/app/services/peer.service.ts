import { Injectable } from '@angular/core';
import { Peer } from 'simple-peer';
@Injectable({
  providedIn: 'root'
})
export class PeerService {
  public peer;
  constructor() { }

  initCall(stream: MediaStream): void {
    this.peer = new Peer({ initiator: true, stream: stream })
    this.handleErr();
  }

  passStream(stream: MediaStream): void {
    this.peer.addStream(stream);
  }


  private handleErr(): void {
    this.peer.on('error', (err) => {
      alert('Lỗi: ' + err.message)
    })
  }
}
