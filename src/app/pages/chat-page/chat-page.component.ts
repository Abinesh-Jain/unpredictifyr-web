import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChatServiceService } from '../../services/chat-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NameModalComponent } from "../../components/name-modal/name-modal.component";

interface Message {
  text: string;
  sender: string;
  timestamp: Date;
  isSent: boolean;
  isRead?: boolean;
  attachment?: string;
  type: MessageType;
}

@Component({
  selector: 'app-chat-page',
  standalone: true,
  templateUrl: './chat-page.component.html',
  styleUrl: './chat-page.component.scss',
  imports: [CommonModule, FormsModule, NameModalComponent]
})
export class ChatPageComponent implements OnInit {
  @ViewChild('scroll') private scroll?: ElementRef;

  name: string = '';
  message: string = '';
  messages: Message[] = [];
  MessageType = MessageType;

  constructor(private chatService: ChatServiceService, private router: Router) { }


  ngOnInit(): void {
    const name = localStorage.getItem('name');
    if (!name) this.router.navigate(['']);
    this.name = name!;
    this.chatService.emit('name', name);
    this.chatService.onEvent('info').subscribe((info: any) => {
      this.messages.push({
        text: info['message'],
        sender: this.capitalizeFirstLetter(`${info['sender'] ?? 'Someone'}`),
        timestamp: new Date(info['timestamp']),
        isSent: false,
        type: MessageType.info,
      });
      this.scrollToBottom();
    })
    this.chatService.onEvent('message').subscribe((message: any) => {
      this.messages.push({
        text: message['message'],
        sender: this.capitalizeFirstLetter(`${message['sender'] ?? 'Someone'}`),
        timestamp: new Date(message['timestamp']),
        isSent: false,
        type: MessageType.received,
      });
      this.scrollToBottom();
    })
  }

  sendMessage() {
    if (this.message.trim().length <= 0) return;
    this.chatService.emit('message', this.message);
    let message: Message = {
      text: this.message,
      sender: 'You',
      timestamp: new Date(),
      isSent: true,
      type: MessageType.sent,
    };
    this.messages.push(message);
    this.message = '';
    this.scrollToBottom();
  }

  scrollToBottom() {
    try {
      setTimeout(() =>
        this.scroll!.nativeElement.scrollTop = this.scroll!.nativeElement.scrollHeight
      );
    } catch (error) {
      console.error(error);
    }
  }

  getTime(date: Date): string {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const paddedHours = String(hours).padStart(2, '0');
    const paddedMinutes = String(minutes).padStart(2, '0');
    return `${paddedHours}:${paddedMinutes} ${ampm}`;
  }

  capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

}


enum MessageType {
  sent, received, info
}