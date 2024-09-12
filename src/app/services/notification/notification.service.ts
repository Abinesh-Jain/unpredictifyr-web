import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  public isNotificationSupported(): boolean {
    return 'Notification' in window;
  }

  // Request permission for notifications
  public requestPermission(): Promise<NotificationPermission> {
    return Notification.requestPermission();
  }

  // Show a notification
  public showNotification(title: string, options?: NotificationOptions): void {
    if (this.isNotificationSupported() && Notification.permission === 'granted') {
      new Notification(title, options);
    }
  }
}
