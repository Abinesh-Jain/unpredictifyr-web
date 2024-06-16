import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { Message } from '../../models/message.modal';
import * as XLSX from 'xlsx';
import FileSaver from 'file-saver';

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

  async exportMessagesAsCSV() {
    const messages = await this.getAllMessages();
    const csvContent = this.convertToCSV(messages);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    FileSaver.saveAs(blob, 'messages.csv');
  }

  async exportMessagesAsXLS() {
    const messages = await this.getAllMessages();
    const headers = this.extractHeaders(messages);
    const worksheet = XLSX.utils.json_to_sheet(messages, { header: headers });
    const workbook = {
      Sheets: { 'data': worksheet },
      SheetNames: ['data']
    };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    FileSaver.saveAs(blob, 'messages.xlsx');
  }

  async exportMessagesAsJSON() {
    const messages = await this.getAllMessages();
    const jsonContent = JSON.stringify(messages, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
    FileSaver.saveAs(blob, 'messages.json');
  }

  private convertToCSV(data: any[]) {
    const replacer = (key: any, value: any) => value === null ? '' : value;
    const header = this.extractHeaders(data);
    const csv = [
      header.join(','),
      ...data.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
    ].join('\r\n');
    return csv;
  }

  private extractHeaders(data: any[]): string[] {
    if (data.length === 0) return [];
    return Object.keys(data[0]);
  }
}
