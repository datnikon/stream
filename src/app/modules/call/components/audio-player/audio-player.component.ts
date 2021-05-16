import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import Utils from 'src/app/utils/utils';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss']
})
export class AudioPlayerComponent implements OnInit, AfterViewInit {
  @ViewChild('audioPlayer') audioElement?: any;
  public audioElementRef: any;
  public mediaStreamRef?: MediaStream;
  constructor() { }
  ngAfterViewInit(): void {
    this.audioElementRef = this.audioElement.nativeElement;
    this.showLocalAudio();
  }

  ngOnInit(): void {
  }

  public showLocalAudio(): void {
    if (this.audioElementRef) {
      Utils.getMediaStream({ video: true, audio: true }).then(stream => {
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
