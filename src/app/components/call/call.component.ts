import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-call',
  templateUrl: './call.component.html',
  styleUrls: ['./call.component.scss']
})
export class CallComponent implements OnInit, AfterViewInit {

  @ViewChild('myVideo') myVideoElm?: ElementRef;
  @ViewChild('anotherVideo') anotherVideoElm?: ElementRef;
  public myVideoElmRef: any;
  public anotherVideoElmRef: any;
  public peer: any;
  public call: any;
  public roomId: string = '';
  constructor() { }
  ngAfterViewInit(): void {
    this.myVideoElmRef = this.myVideoElm?.nativeElement;
    this.anotherVideoElmRef = this.anotherVideoElm?.nativeElement;
  }

  ngOnInit(): void {
  }

  public makeCall(): void {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
      this.setMyStream(stream);
    }).catch((err) => {
      alert('Chưa cấp quền truy cập camera/mic')
      console.log(err);
    })
  }

  public setAnotherStream(otherUserVideoStream: MediaStream): void {
    if (this.anotherVideoElmRef) {
      this.anotherVideoElmRef.srcObject = otherUserVideoStream;
      this.anotherVideoElmRef.play();
    }

  }

  public setMyStream(myStream: MediaStream): void {
    if (this.myVideoElmRef) {
      this.myVideoElmRef.srcObject = myStream;
      this.myVideoElmRef.play();
    }
  }


}
