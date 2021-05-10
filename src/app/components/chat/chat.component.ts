import { Component, OnInit } from '@angular/core';
import { Chat } from 'src/app/models/chat.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  public message = '';
  public isMe = true;
  public chats: Chat[] = []
  constructor() { }

  ngOnInit(): void {
  }

  public addMessage(): void {
    this.chats.unshift({ name: 'Dat', content: this.message, isMe: this.isMe });
    this.message = '';
    this.isMe = !this.isMe;
    this.scrollToEnd();
  }

  private scrollToEnd(): void {
    const lastMessageElement = document.getElementById(`conversation`);
    if (lastMessageElement) {
      lastMessageElement.animate({ behavior: "smooth" });
      lastMessageElement.scrollTo(0, 10000);
    }
  }

}
