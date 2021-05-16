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
  constructor() {
    this.initPeer();
  }

  public openPeer(stream: MediaStream): Promise<string> {
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
    let call = this.peer.call(anotherPeerId, stream);
    call.on('stream', (userVideoStream) => {
      console.log('Đã trả lừi');
      this.joinUser.next({ peerId: anotherPeerId, stream: userVideoStream });
    })
    call.on('close', () => {
      console.log('Call close');
      this.leaveUser.next(anotherPeerId);
    })

    call.on('error', (error) => {
      console.log(error);
    })
  }

  public handelAnswerCall(call: any, anotherPeerId: string): void {
    call.on('stream', (userVideoStream) => {
      console.log('Đã trả lừi');
      this.joinUser.next({ peerId: anotherPeerId, stream: userVideoStream });
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
      const answerCall = confirm("Do you want to answer?");
      if (answerCall) {
        call.answer(stream);
        call.on('stream', (anotherStream: any) => {
          this.joinUser.next({ peerId: call.peer, stream: anotherStream });
        })
        call.on('close', () => {
          console.log('Call close');
          this.leaveUser.next(call.peer);
        })
      }

    })
  }

  private initPeer(): void {
    this.peer = new Peer(this.myPeerId, {
      host: '/',
      port: '3001'
    });
  }

}
