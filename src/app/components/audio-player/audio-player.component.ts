import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MediaService } from 'src/app/services/media.service';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss']
})
export class AudioPlayerComponent implements OnInit, AfterViewInit {
  @ViewChild('audioPlayer') audioElement?: any;
  public audioElementRef: any;
  public mediaStreamRef?: MediaStream;
  constructor(private mediaService: MediaService) { }
  ngAfterViewInit(): void {
    this.audioElementRef = this.audioElement.nativeElement;
    this.showLocalAudio();
  }

  ngOnInit(): void {
  }

  public showLocalAudio(): void {
    if (this.audioElementRef) {
      this.mediaService.getMediaStream({ video: true, audio: true }).then(stream => {
        this.mediaStreamRef = stream;
        this.audioElementRef.srcObject = stream;
        this.audioElementRef.play();
      })
    }
  }

  public muteAudio(): void {
    if (this.mediaStreamRef) {
      this.mediaStreamRef.getAudioTracks()[0].enabled = !this.mediaStreamRef.getAudioTracks()[0].enabled;
    }
  }

}
