import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Utils from 'src/app/utils/utils';
import { CallUser, PeerService } from '../../services/peer.service';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'app-call',
  templateUrl: './call.component.html',
  styleUrls: ['./call.component.scss']
})
export class CallComponent implements OnInit, AfterViewInit {
  public joinedUsers: CallUser[] = [];
  public localStream: MediaStream;
  public isShowFulScreen: boolean = false;
  private roomId: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private socketService: SocketService,
    private peerService: PeerService,) { }


  ngAfterViewInit(): void {
    this.listenNewUser();
    this.listenLeavedUser();
  }

  ngOnInit(): void {
    this.roomId = this.activatedRoute.snapshot.paramMap.get('roomId');
    Utils.getMediaStream({ video: false, audio: true }).then(stream => {
      this.localStream = stream;
      this.openPeer();
    })
  }

  showMediaFullscreen(): void {
    this.isShowFulScreen = !this.isShowFulScreen;
    console.log("ABC", this.isShowFulScreen);
  }

  private listenNewUser(): void {
    this.listenNewUserJoinRoom();
    this.listenNewUserStream()
  }

  private listenLeavedUser(): void {
    this.socketService.leaveId.subscribe(userPeerId => {
      this.joinedUsers = this.joinedUsers.filter(x => x.peerId != userPeerId);
    })
  }

  private listenNewUserJoinRoom(): void {
    this.socketService.joinId.subscribe(newUserId => {
      if (newUserId) {
        this.makeCall(newUserId);
      }
    })
  }

  private listenNewUserStream(): void {
    this.peerService.joinUser.subscribe(user => {
      if (user) {
        if (this.joinedUsers.findIndex(u => u.peerId === user.peerId) < 0) {
          this.joinedUsers.push(user);
        }
      }
    })
  }

  private openPeer(): void {
    this.peerService.openPeer(this.localStream).then((myPeerId) => {
      this.joinRoom(this.roomId, myPeerId);
    })
  }

  private makeCall(anotherPeerId: string): void {
    this.peerService.call(anotherPeerId, this.localStream);
  }

  private joinRoom(roomId: string, userPeerId: string): void {
    this.socketService.joinRoom(roomId, userPeerId);
  }

}
