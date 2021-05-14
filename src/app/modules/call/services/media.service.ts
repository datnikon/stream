import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class MediaService {
  public localStream: MediaStream;
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
}
