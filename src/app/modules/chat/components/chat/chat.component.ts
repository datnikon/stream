import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  public isChatHide = false;
  @Output() onHide = new EventEmitter();
  constructor(private socketService: SocketService) {
  }

  ngOnInit(): void {
    this.handleNewMessage();
    this.addIntroMessage();
  }

  addIntroMessage(): void {
    this.message = `Share this link to your friend to start video call ${window.location.href}`;
    this.addMessage();
  }

  handleNewMessage(): void {
    this.socketService.newMessage.subscribe(message => {
      if (message) {
        this.chats.push({ content: message })
        this.scrollToNewMessage();
      }
    })
  }

  hideOrUnhideChat(): void {
    this.isChatHide = !this.isChatHide
    this.onHide.emit();
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
