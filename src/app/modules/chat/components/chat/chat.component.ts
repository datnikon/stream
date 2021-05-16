import { Component, OnInit } from '@angular/core';
import { SocketService } from 'src/app/modules/call/services/socket.service';
import { Chat } from '../../models/chat.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  public message = '';
  public isMe = true;
  public chats: Chat[] = []
  constructor(private socketService: SocketService) {
  }

  ngOnInit(): void {
    this.socketService.newMessage.subscribe(message => {
      console.log("New message", message)
      if (message) {
        this.chats.push({ content: message })
      }
    })
  }

  public addMessage(): void {
    this.socketService.chat(this.message)
    this.chats.push({ content: this.message, isMe: true });
    this.message = '';
  }

  private scrollToEnd(): void {
    const lastMessageElement = document.getElementById(`conversation`);
    if (lastMessageElement) {
      lastMessageElement.animate({ behavior: "smooth" });
      lastMessageElement.scrollTo(0, 10000);
    }
  }

}
