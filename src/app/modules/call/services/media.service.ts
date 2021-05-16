import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MediaIconUrl } from '../data/media-icon';
@Injectable()
export class MediaService {
  public stream: MediaStream;
  public isMute = new BehaviorSubject(true);
  public isCameraOff = new BehaviorSubject(true);
  public mode: 'view' | 'owner' = 'view';
  constructor() {
  }

  public muteOrUnMute(): void {
    if (this.stream) {
      this.isMute.next(!this.isMute.getValue());
      this.stream.getAudioTracks()[0].enabled = this.isMute.getValue();
    }
  }
  public turnVideoOnOrOff(): void {
    if (this.stream) {
      this.isCameraOff.next(!this.isCameraOff.getValue());
      this.stream.getVideoTracks()[0].enabled = this.isCameraOff.getValue();
    }
  }

  public getMicSrc(): string {
    if (this.mode === 'owner') {
      return this.isMute.getValue() ? MediaIconUrl.micIconUrl : MediaIconUrl.micMuteIconUrl;
    }
    return this.isMute.getValue() ? MediaIconUrl.soundIconUrl : MediaIconUrl.soundOffIconUrl;
  }

  public getWebcamSrc(): string {
    return this.isCameraOff.getValue() ? MediaIconUrl.cameraIconUrl : MediaIconUrl.cameraOffIconUrl;
  }
}
