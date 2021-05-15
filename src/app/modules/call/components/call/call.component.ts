import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MediaService } from '../../services/media.service';
import { PeerService } from '../../services/peer.service';
import { SocketService } from '../../services/socket.service';
import { VideoPlayerComponent } from '../video-player/video-player.component';

@Component({
  selector: 'app-call',
  templateUrl: './call.component.html',
  styleUrls: ['./call.component.scss']
})
export class CallComponent implements OnInit, AfterViewInit {

  @ViewChild('myVideo') myVideo: VideoPlayerComponent;
  @ViewChild('anotherVideo') anotherVideo: VideoPlayerComponent;
  public peer: any;
  public call: any;
  public roomId: string = '';
  constructor(
    private activatedRoute: ActivatedRoute,
    private socketService: SocketService,
    private peerService: PeerService,
    private mediaService: MediaService) { }


  ngAfterViewInit(): void {
    this.openPeer();
    this.listenNewUser();
  }

  ngOnInit(): void {
    this.roomId = this.activatedRoute.snapshot.paramMap.get('roomId');
  }

  public listenNewUser(): void {
    this.listenNewUserJoinRoom();
    this.listenNewUserStream()
  }

  public listenNewUserJoinRoom(): void {
    this.socketService.anotherId.subscribe(newUserId => {
      if (newUserId) {
        console.log("new user join ", newUserId);
        this.makeCall(newUserId);
      }
    })
  }

  public listenNewUserStream(): void {
    this.peerService.anotherUser.subscribe(user => {
      if (user) {
        this.anotherVideo.showAnotherStream(user.stream);
      }
    })
  }

  public openPeer(): void {
    this.peerService.openPeer(this.mediaService.localStream).then((myPeerId) => {
      this.joinRoom(this.roomId, myPeerId);
    })
  }

  public makeCall(anotherPeerId: string): void {
    this.peerService.call(anotherPeerId, this.mediaService.localStream);
  }

  public joinRoom(roomId: string, userPeerId: string): void {
    this.socketService.joinRoom(roomId, userPeerId);
  }

}
