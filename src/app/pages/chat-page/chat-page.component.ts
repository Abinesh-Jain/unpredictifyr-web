import { Component, ElementRef, HostListener, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ChatServiceService } from '../../services/chat-service/chat-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Message, MessageType } from '../../models/message.modal';
import { MessageService } from '../../services/message/message.service';
import { Subscription } from 'rxjs';
import { MenuComponent } from "../../components/menu/menu.component";
import { ModalService } from '../../services/modal/modal.service';

@Component({
  selector: 'app-chat-page',
  standalone: true,
  templateUrl: './chat-page.component.html',
  styleUrl: './chat-page.component.scss',
  imports: [CommonModule, FormsModule, MenuComponent, RouterModule]
})
export class ChatPageComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChild('scroll') private scroll?: ElementRef;

  name: string = '';
  message: string = '';
  messages: Message[] = [];
  mediaStream: MediaStream | undefined;
  private subscriptions: Subscription[] = [];

  options = [
    {
      label: 'Settings',
      onPressed: () => this.router.navigate(['/settings']),
    },
    {
      label: 'Export chat',
      onPressed: () => console.log('export'),
    },
    {
      label: 'Clear chat',
      onPressed: () => this.clearChat(),
    },
    {
      label: 'Block',
      onPressed: () => this.modalService.open('Delete', 'You sure ?', [{
        distructive: false, label: 'Cancel', onPressed: () => console.log('cancel'),
      }, {
        distructive: true, label: 'Delete', onPressed: () => console.log('delete'),
      },],),
    }
  ];

  MessageType = MessageType;

  @Input() user?: any;
  @Input() fullHeight = true;

  constructor(private chatService: ChatServiceService, private router: Router, private messageService: MessageService, private modalService: ModalService) { }


  ngOnInit(): void {
    const name = localStorage.getItem('name');
    if (!name) this.router.navigate(['']);
    this.name = name!;
    this.chatService.emit('name', name);
    this.loadMessages();
    this.subscriptions.push(
      this.chatService.onEvent('connect').subscribe(() => this.onConnectionChanged(true)),
      this.chatService.onEvent('disconnect').subscribe(() => this.onConnectionChanged(false)),
      this.chatService.onEvent('info').subscribe(info => this.onInfoReceived(info)),
      this.chatService.onEvent('message').subscribe(message => this.onMessageReceived(message)),
    );
  }

  loadMessages() {
    this.messageService.getAllMessages().then((messages: Message[]) => {
      this.messages = messages;
      this.scrollToBottom();
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user']) {
      if (changes['user'].currentValue) {
        this.messages = [];
      } else {
        this.loadMessages();
      }
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event: Event) {
    this.onConnectionChanged(false);
  }

  onConnectionChanged(connected: boolean) {
    const msg = {
      text: connected ? 'You joined the chat' : 'You left the chat',
      sender: this.name,
      timestamp: new Date(),
      isSent: false,
      type: MessageType.info,
      group: true,
    };
    this.messages.push(msg);
    this.scrollToBottom();
    this.messageService.addMessage(msg);
  }

  onInfoReceived(info: any) {
    const msg = {
      text: info['message'],
      sender: this.capitalizeFirstLetter(`${info['sender'] ?? 'Someone'}`),
      timestamp: new Date(info['timestamp']),
      isSent: false,
      type: MessageType.info,
      group: true,
    }
    this.messages.push(msg);
    this.scrollToBottom();
    this.messageService.addMessage(msg);
  }

  onMessageReceived(message: any) {
    const msg = {
      text: message['message'],
      sender: this.capitalizeFirstLetter(`${message['sender'] ?? 'Someone'}`),
      timestamp: new Date(message['timestamp']),
      isSent: false,
      type: MessageType.received,
      group: true,
    };
    this.messages.push(msg);
    this.scrollToBottom();
    this.messageService.addMessage(msg);
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
      group: true,
    };
    this.messages.push(message);
    this.message = '';
    this.scrollToBottom();
    document.querySelector('input')?.focus();
    this.messageService.addMessage(message);
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

  react() {
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach((track) => {
        track.stop();
      });
      this.mediaStream = undefined;
    } else {
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        this.mediaStream = stream;
      });
    }
  }

  clearChat() {
    this.messages = [];
    this.messageService.clearMessages();
  }

}