import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MediaService } from 'src/app/modules/call/services/media.service';
@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss'],
  providers: [MediaService]
})
export class VideoPlayerComponent implements AfterViewInit, OnInit {
  @ViewChild('videoPlayer') videoElement?: any;
  @Input() mode: 'view' | 'owner' = 'view';
  @Input() stream: MediaStream;
  public micIconSrc: string;
  public webCamIconSrc: string;
  public videoElementRef: any;

  constructor(
    private mediaService: MediaService
  ) { }

  ngOnInit(): void {
    this.mediaService.mode = this.mode;
    this.micIconSrc = this.mediaService.getMicSrc();
    this.webCamIconSrc = this.mediaService.getWebcamSrc();
  }

  ngAfterViewInit(): void {
    this.mediaService.stream = this.stream;
    this.videoElementRef = this.videoElement.nativeElement;
    if (this.mode === 'owner') {
      this.videoElementRef.muted = true;
    }
    this.playVideo();
    this.listenMediaControlChanges();
  }

  public turnVideoOnOrOff(): void {
    this.mediaService.turnVideoOnOrOff()
  }

  public muteOrUnMute(): void {
    this.mediaService.muteOrUnMute();
  }

  private listenMediaControlChanges(): void {
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
