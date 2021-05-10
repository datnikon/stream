import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Utils from 'src/app/utils/utils';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  public roomId: string = '';
  constructor(private router: Router) { }

  public createRoom(): void {
    const roomId = Utils.genRoomId();
    this.router.navigateByUrl(`/call/${roomId}`)
  }
  public goToRoom(): void {
    if (this.roomId.length === 4) {
      this.router.navigateByUrl(`/call/${this.roomId}`)
    } else {
      alert("Mã phòng không hợp lệ");
    }
  }
}
