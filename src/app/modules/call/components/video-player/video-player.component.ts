import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MediaService } from 'src/app/modules/call/services/media.service';
@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss'],
  providers: [MediaService]
})
export class VideoPlayerComponent implements AfterViewInit {
  @ViewChild('videoPlayer') videoElement?: any;
  @Input() mode: 'view' | 'owner' = 'view';
  @Input() stream: MediaStream;
  public micIconSrc: string;
  public webCamIconSrc: string;
  public videoElementRef: any;

  constructor(
    private mediaService: MediaService
  ) { }

  ngAfterViewInit(): void {
    this.mediaService.stream = this.stream;
    this.mediaService.mode = this.mode;
    this.micIconSrc = this.mediaService.getMicSrc();
    this.videoElementRef = this.videoElement.nativeElement;
    this.playVideo();
    this.listenChanges();
  }

  public turnVideoOnOrOff(): void {
    this.mediaService.turnVideoOnOrOff()
  }

  public muteOrUnMute(): void {
    this.mediaService.muteOrUnMute();
  }

  private listenChanges(): void {
    this.mediaService.isMute.subscribe(() => {
      this.micIconSrc = this.mediaService.getMicSrc();
    })
    this.mediaService.isCameraOff.subscribe(() => {
      this.webCamIconSrc = this.mediaService.getWebcamSrc();
    })
  }

  private playVideo() {
    if (this.videoElementRef) {
      this.videoElementRef.srcObject = this.stream;
      this.videoElementRef.play();
    }
  }
}
