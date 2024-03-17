import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { Message } from '../../models/message.modal';

@Injectable({
  providedIn: 'root'
})
export class MessageService extends Dexie {
  messages: Dexie.Table<Message, number>;

  constructor() {
    super('messages');
    this.version(1).stores({
      messages: '++id,text,sender,timestamp,isSent,type'
    });
    this.messages = this.table('messages');
  }

  addMessage(message: Message): Promise<number> {
    return this.messages.add(message);
  }

  getAllMessages(): Promise<Message[]> {
    return this.messages.toArray();
  }

  clearMessages(): Promise<void> {
    return this.messages.clear();
  }
}
