import { Injectable } from '@angular/core';

export interface Toast {
  content: string;
  classname: string;
  header: string;
  delay?: number;
  position: string;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor() { }

  toasts: Toast[] = [];

  show(content: string, type?: ToastType, header?: string, delay?: number, position?: ToastPosition) {
    const typeClass = this.getTypeClass(type || ToastType.INFO);
    this.toasts.push({
      content,
      classname: typeClass,
      header: header || type || 'Info',
      position: position || ToastPosition.TOP_RIGHT,
      delay: delay
    });
  }

  remove(toast: Toast) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }

  clear() {
    this.toasts = [];
  }

  private getTypeClass(type: ToastType): string {
    switch (type) {
      case ToastType.SUCCESS:
        return 'bg-success text-light';
      case ToastType.ERROR:
        return 'bg-danger text-light';
      case ToastType.WARNING:
        return 'bg-warning text-dark';
      case ToastType.INFO:
      default:
        return 'bg-info text-light';
    }
  }
}
export enum ToastType {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info'
}

export enum ToastPosition {
  TOP_RIGHT = 'top-0 end-0',
  TOP_LEFT = 'top-0 start-0',
  BOTTOM_RIGHT = 'bottom-0 end-0',
  BOTTOM_LEFT = 'bottom-0 start-0',
  TOP_CENTER = 'top-0 start-50 translate-middle-x',
  BOTTOM_CENTER = 'bottom-0 start-50 translate-middle-x'
}
