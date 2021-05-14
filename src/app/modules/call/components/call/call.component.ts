import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideoPlayerComponent } from '../video-player/video-player.component';

@Component({
  selector: 'app-call',
  templateUrl: './call.component.html',
  styleUrls: ['./call.component.scss']
})
export class CallComponent implements OnInit {

  @ViewChild('myVideo') myVideo: VideoPlayerComponent;
  @ViewChild('anotherVideo') anotherVideo: VideoPlayerComponent;
  public peer: any;
  public call: any;
  public roomId: string = '';
  constructor(
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.roomId = this.activatedRoute.snapshot.paramMap.get('roomId');
  }

}
