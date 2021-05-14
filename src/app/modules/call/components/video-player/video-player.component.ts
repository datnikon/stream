import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MediaService } from 'src/app/modules/call/services/media.service';
import { PeerService } from '../../services/peer.service';
declare var Peer: any;
@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements AfterViewInit {
  @ViewChild('videoPlayer') videoElement?: any;
  @Input() mode: 'view' | 'owner' = 'view';
  public videoElementRef: any;
  public mediaStreamRef?: MediaStream;
  public isMute = false;
  public isCameraOff = false;
  public remoteId;
  private micImg = 'data:image/png;base64,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';
  private micMuteImg = 'data:image/png;base64,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';

  private cameraImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAzElEQVRIie2USw6CMBCGP12wgdO4V7yIO/cmJnKGeg6WPuKlwFNIXXRMVPrSutDInzQ0/Zn5pp0C/IMqQDtGlZp8AXQeQAcsfQlGd3OdWo0t9/jDSXv6GsAemAGFjBI4vgpzNXLliVl74qIAO/EyYAu0QAMoWUN28jZgKp6yeEq8MgWQi9davLN4hQ8QavLtO7FVdInJEQJM5FlbvPrpnaBs2zyIl2HOvKHf5JMjNgqgMVfRpY0nLhqgMVdxjml6LnNX5Q+A4Wc36Ad0BaylfKD5mysrAAAAAElFTkSuQmCC';
  private cameraOffImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAABxElEQVRIia3VMWtUQRAH8N8LchaJZ6OCATsLbeUkWFgKFgbr2KpgI/glLKzUxkBUtNLCLyBG0UKjsVcP7SOCNpIUdyDPYvf05bn7Nof5w7C82dn5v5mdma3wAd+xiJ/S2Ic9Ld0YWxn7bXiFGmvot/bm8Dzut+UXVrG3RDDbQXI947wp17qcV3Ht4ylO4S1uYgYriaja+IarLd0PvMcmHInO+jGC0h/vVL5iUOE1vuCikPNJJE2Mo93HGPUxnEavEN27yeEaDzKRPMLhxOGDuFOIYqyleJggWcN+nMcN3MZS4+8vF0j+UaRIthJ2n3A0kixPQ1DjbjxYuvhhjOQQRtMQvGzkukSyFO2SDTkjjWFczwi1fFbojxQW4vo5tZkjqON6TkhXF8modSbprC2rce9C/L4v34yL0fZFxldSORLqvCdUS417CZJNoYTnTXnJtdBEhFIcRt2K0MntPnnc4aezSS5Fkp5QLbf8HSM7nV1/RkVOlmO6UiiRjCthIC1kHEwwGXZD4R6OC2V5RX5AwjoMhNFaCjUluQFZC+/EYPLgzOEkDhQiSeENNmx/tDZwIpLsKrqe311DM13PqoLx/5A8wexvhEQZ7tBnoQoAAAAASUVORK5CYII=';

  private soundImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAABEUlEQVRIieXVP0oDQRiG8Z+SMoXYxQsEKy0srCyCYC1YWXgHzyF2nkDESkinBP+g1l4goKWxE+sgxGJ3UcbZTWZ1QfCBKYZh3me/2fl2+Y+0mwzv4iRlw3xi+A06TQiK8KWU8FkFy7jFHJ4i620cYSFVXoS/YCSr4g7XQfg9xtiKBbSC+SoOgvkYPQwje8+xjl0MYoLwiBax6bPch5JweEc/Dz+LhcfoYYKNkvXwiKaSck3L2MPll7Hy24JKwpdch+N8RCmr4FBW7oXsepaxj50qeyh4xRXe8vmarINjkha2cTpNUkXRaM9qNlqq5NH3a/qjT0VBNxdMIoJKZr2mQ1kTjtKeK60PaktSafSX+ff4AGpjNL4njw0PAAAAAElFTkSuQmCC';
  private soundOffImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAkElEQVRIie2Suw2AMAwFHzADESvCArSMRsMCUDBOKDCSZZmggC1R5Ko4tt4pH6BgzOQdHr3DXQQ83Fwgw00FWrgU9AACqwPtqWhhKcFA9UbBgdaRep8FPHATa36q1wIAaAGsrLcD6PhArZk+Ut01fndF2Y8sMf+mGuODwAQpcYFL3LgkWTQZswvOPz7nSgpJDrQEcJ0HwMYYAAAAAElFTkSuQmCC'
  constructor(
    private mediaService: MediaService,
    private peerService: PeerService
  ) { }

  ngAfterViewInit(): void {
    this.videoElementRef = this.videoElement.nativeElement;
    if (this.mode === 'owner') {
      this.showLocalVideo();
    }
  }

  public showLocalVideo(): void {
    if (this.videoElementRef) {
      this.mediaService.getMediaStream({ video: true, audio: true }).then(stream => {
        this.mediaStreamRef = stream;
        this.videoElementRef.srcObject = stream;
        this.videoElementRef.play();
      })
    }
  }

  makeCall() {
    const peer = new Peer('pick-an-id');
  }

  public muteOrUnMute(): void {
    if (this.mediaStreamRef) {
      this.mediaStreamRef.getAudioTracks()[0].enabled = this.isMute;
      this.isMute = !this.isMute;
    }
  }
  public turnVideoOnOrOff(): void {
    if (this.mediaStreamRef) {
      this.mediaStreamRef.getVideoTracks()[0].enabled = this.isCameraOff;
      this.isCameraOff = !this.isCameraOff;
    }
  }

  public getMicSrc(): string {
    if (this.mode === 'owner') {
      return this.isMute ? this.micMuteImg : this.micImg;
    }
    return this.isMute ? this.soundOffImg : this.soundImg;
  }

  public getWebcamSrc(): string {
    return this.isCameraOff ? this.cameraOffImg : this.cameraImg;
  }
}
