import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MediaIconUrl } from '../data/media-icon';
@Injectable()
export class MediaService {
  public localStream: MediaStream;
  public isMute = new BehaviorSubject(true);
  public isCameraOff = new BehaviorSubject(true);
  public mode: 'view' | 'owner' = 'view';
  constructor() { }

  public getMediaStream(constraints?: MediaStreamConstraints): Promise<MediaStream> {
    return new Promise<MediaStream>((resolve, reject) => {
      navigator.mediaDevices.getUserMedia(constraints).then(stream => {
        this.localStream = stream;
        resolve(stream);
      }).catch(() => {
        alert('Bạn chưa cấp quyền truy cập camera/micro');
        reject();
      })
    }
    )
  }

  public muteOrUnMute(): void {
    if (this.localStream) {
      this.isMute.next(!this.isMute.getValue());
      this.localStream.getAudioTracks()[0].enabled = this.isMute.getValue();
    }
  }
  public turnVideoOnOrOff(): void {
    if (this.localStream) {
      this.isCameraOff.next(!this.isCameraOff.getValue());
      this.localStream.getVideoTracks()[0].enabled = this.isCameraOff.getValue();
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
