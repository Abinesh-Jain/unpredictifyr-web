import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { ChatServiceService } from '../../services/chat-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

interface Message {
  text: string;
  sender: string;
  timestamp: Date;
  isSent: boolean;
  isRead?: boolean;
  attachment?: string;
}

@Component({
  selector: 'app-chat-page',
  standalone: true,
  templateUrl: './chat-page.component.html',
  styleUrl: './chat-page.component.scss',
  imports: [CommonModule, FormsModule]
})
export class ChatPageComponent implements OnInit, AfterViewInit {
  @ViewChild('scroll') private scroll?: ElementRef;

  name?: string;
  message: string = '';
  messages: Message[] = [];

  private modalService = inject(NgbModal);

  constructor(private chatService: ChatServiceService) { }


  ngOnInit(): void {
    this.chatService.onEvent('message').subscribe((message: any) => {
      this.messages.push({
        text: `${message}`,
        sender: '',
        timestamp: new Date(),
        isSent: false,
      });
      this.scrollToBottom();
    })
  }

  ngAfterViewInit(): void {
    let name = prompt('What is your name ?');
    this.name = name ?? undefined;
    this.chatService.emit('name', name);
  }

  sendMessage() {
    if (this.message.trim().length <= 0) return;
    this.chatService.emit('message', this.message);
    let message: Message = {
      text: this.message,
      sender: '',
      timestamp: new Date(),
      isSent: true,
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

}
