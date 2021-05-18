import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
declare var Peer: any;
export interface CallUser {
  peerId: string;
  stream: MediaStream;
}
@Injectable()
export class PeerService {
  public peer;
  public myPeerId: string;
  public joinUser = new BehaviorSubject<CallUser>(null);
  public leaveUser = new BehaviorSubject<string>(null);
  public localStream: MediaStream;

  public openPeer(stream: MediaStream): Promise<string> {
    this.initPeer();
    return new Promise<string>((resolve) => {
      this.peer.on('open', (uerPeerId: string) => {
        this.myPeerId = uerPeerId
        this.handleInComingCall(stream);
        resolve(uerPeerId);
      })
    }
    )
  }

  public call(anotherPeerId: string, stream: MediaStream): void {
    var call = this.peer.call(anotherPeerId, stream);
    this.handelCall(call, anotherPeerId);
  }

  public handelCall(call: any, anotherPeerId: string): void {
    call.on('stream', (anotherStream: any) => {
      this.joinUser.next({ peerId: anotherPeerId, stream: anotherStream });
    })
  }

  public handleInComingCall(stream: MediaStream): void {
    this.peer.on('call', call => {
      call.answer(stream);
      call.on('stream', (anotherStream: any) => {
        this.joinUser.next({ peerId: call.peer, stream: anotherStream });
      })
    })
  }

  private initPeer(): void {
    this.peer = new Peer(this.myPeerId, {
      host: '/',
      port: '3001'
    });
  }

}
