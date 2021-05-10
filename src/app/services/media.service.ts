import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  constructor() { }

  public getMediaStream(constraints?: MediaStreamConstraints): Promise<MediaStream> {
    return new Promise<MediaStream>((resolve, reject) => {
      navigator.mediaDevices.getUserMedia(constraints).then(stream => {
        resolve(stream);
      }).catch(() => {
        alert('Bạn chưa cấp quyền truy cập camera/micro');
        reject();
      })
    }
    )
  }
}
