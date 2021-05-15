import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
declare var Peer: any;

export interface CallUser {
  stream: MediaStream;
}
@Injectable()
export class PeerService {
  public peer;
  public myPeerId: string;
  public anotherUser = new BehaviorSubject<CallUser>(null);
  constructor() {
    this.initPeer();
  }


  initPeer(): void {
    this.peer = new Peer(this.myPeerId, {
      host: '/',
      port: '3001'
    });
  }

  openPeer(stream: MediaStream): Promise<string> {
    return new Promise<string>((resolve) => {
      this.peer.on('open', (uerPeerId: string) => {
        this.myPeerId = uerPeerId
        this.handleCall(stream);
        resolve(uerPeerId);
      })
    }
    )
  }

  call(anotherPeerId: string, stream: MediaStream): void {
    this.peer.call(anotherPeerId, stream);
  }

  public handleCall(stream: MediaStream): void {
    this.peer.on('call', call => {
      console.log('New one call');
      call.answer(stream);
      console.log('Ansewerd');
      call.on('stream', (anotherStream: any) => {
        this.anotherUser.next({ stream: anotherStream });
      })
    })
  }

}
