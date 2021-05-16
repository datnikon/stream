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
  constructor() {
  }

  public openPeer(stream: MediaStream): Promise<string> {
    this.initPeer();
    return new Promise<string>((resolve) => {
      this.peer.on('open', (uerPeerId: string) => {
        this.myPeerId = uerPeerId
        this.handleComingCall(stream);
        resolve(uerPeerId);
      })
    }
    )
  }

  public call(anotherPeerId: string, stream: MediaStream): void {
    console.log("Call ", anotherPeerId)
    var call = this.peer.call(anotherPeerId, stream);
    this.handelAnswerCall(call, anotherPeerId);
  }

  public handelAnswerCall(call: any, anotherPeerId: string): void {
    console.log("Hanlde call");
    call.on('stream', (anotherStream: any) => {
      this.joinUser.next({ peerId: anotherPeerId, stream: anotherStream });
    })
    call.on('close', () => {
      console.log('Call close');
      this.leaveUser.next(anotherPeerId);
    })

    call.on('error', (error) => {
      console.log(error);
    })
  }

  public handleComingCall(stream: MediaStream): void {
    this.peer.on('call', call => {
      call.answer(stream);
      call.on('stream', (anotherStream: any) => {
        this.joinUser.next({ peerId: call.peer, stream: anotherStream });
      })
      call.on('close', () => {
        this.leaveUser.next(call.peer);
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
