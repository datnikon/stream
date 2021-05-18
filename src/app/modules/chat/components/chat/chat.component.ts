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
  public chats: Chat[] = [];
  constructor(private socketService: SocketService) {
  }

  ngOnInit(): void {
    this.handleNewMessage();
  }

  handleNewMessage(): void {
    this.socketService.newMessage.subscribe(message => {
      if (message) {
        this.chats.push({ content: message })
        this.scrollToNewMessage();
      }
    })
  }

  public addMessage(): void {
    this.socketService.chat(this.message)
    this.chats.push({ content: this.message, isMe: true });
    this.message = '';
    this.scrollToNewMessage();
  }

  private scrollToNewMessage(): void {
    setTimeout(() => {
      const lastMessage = document.getElementById(`${this.chats.length - 1}`);
      if (lastMessage) {
        lastMessage.scrollIntoView();
      }
    }, 200)
  }

}
