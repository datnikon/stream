import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MediaService } from 'src/app/modules/call/services/media.service';
@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements AfterViewInit {
  @ViewChild('videoPlayer') videoElement?: any;
  @Input() mode: 'view' | 'owner' = 'view';
  public micIconSrc: string;
  public webCamIconSrc: string;
  public videoElementRef: any;

  constructor(
    private mediaService: MediaService
  ) { }

  ngOnInit() {
    this.mediaService.mode = this.mode;
    this.micIconSrc = this.mediaService.getMicSrc();
  }

  ngAfterViewInit(): void {
    this.videoElementRef = this.videoElement.nativeElement;
    if (this.mode === 'owner') {
      this.showLocalVideo();
    }
  }

  public showLocalVideo(): void {
    if (this.videoElementRef) {
      this.mediaService.getMediaStream({ video: true, audio: true }).then(stream => {
        this.setLocalStream(stream);
        this.videoElementRef.srcObject = stream;
        this.videoElementRef.play();
      })
    }
  }

  public showAnotherStream(stream: MediaStream) {
    this.videoElementRef.srcObject = stream;
    this.videoElementRef.play();
  }

  public setLocalStream(stream: MediaStream): void {
    this.mediaService.localStream = stream;
    this.listenChanges();
  }

  public turnVideoOnOrOff(): void {
    this.mediaService.turnVideoOnOrOff()
  }

  public muteOrUnMute(): void {
    this.mediaService.muteOrUnMute();
  }

  public listenChanges(): void {
    this.mediaService.isMute.subscribe(() => {
      this.micIconSrc = this.mediaService.getMicSrc();
    })
    this.mediaService.isCameraOff.subscribe(() => {
      this.webCamIconSrc = this.mediaService.getWebcamSrc();
    })
  }
}
