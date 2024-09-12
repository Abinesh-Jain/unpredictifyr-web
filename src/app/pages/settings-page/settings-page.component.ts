import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ThemeToggleComponent } from '../../components/theme-toggle/theme-toggle.component';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { TranslationService } from '../../services/translation/translation.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../services/modal/modal.service';
import { MessageService } from '../../services/message/message.service';
import { AuthService } from '../../services/auth/auth.service';
import { Strings } from '../../utils/strings';
import { ToastService } from '../../services/toast/toast.service';
import { NotificationService } from '../../services/notification/notification.service';

@Component({
  selector: 'app-settings-page',
  standalone: true,
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.scss',
  imports: [FormsModule, ThemeToggleComponent, NavbarComponent, CommonModule]
})
export class SettingsPageComponent implements OnInit, OnDestroy {

  constructor(
    private router: Router,
    private translation: TranslationService,
    private modalService: ModalService,
    private messageService: MessageService,
    private authService: AuthService,
    private toastService: ToastService,
    private notificationService: NotificationService
  ) { }

  Strings = Strings;
  name: string = '';
  language = navigator.language.substring(0, 2);
  translated?: string;
  isDarkMode: boolean = true;
  notifications = true;
  translations = false;
  languages: any = {};
  subscriptions: Subscription[] = [];

  ngOnInit(): void {
    const name = localStorage.getItem('name');
    if (name) {
      this.name = this.tryParse(name);
    } else {
      this.router.navigate(['']);
    }
    this.isDarkMode = this.isLightTheme();
    this.subscriptions.push(
      this.translation.getLanguages().subscribe(res => this.languages = res)
    );
  }

  tryParse(name: string) {
    try {
      return JSON.parse(name);
    } catch (error) {
      return name;
    }
  }

  changeTheme(checked: boolean) {
    if (typeof checked !== 'boolean') return;
    const html = document.querySelector('html');
    if (html) {
      const theme = checked ? 'light' : 'dark';
      html.dataset['bsTheme'] = theme;
      localStorage.setItem('theme', theme);
    }
    this.isDarkMode = !this.isDarkMode;
  }

  isLightTheme(): boolean {
    const html = document.querySelector('html');
    const theme = localStorage.getItem('theme') ?? html?.dataset['bsTheme'] ?? 'light';
    return theme == 'light';
  }

  onLanguageChange(event: any) {
    this.language = event.target.value;
    const label = this.languages[this.language];
    this.subscriptions.push(
      this.translation.getTranslation(label, this.language)
        .subscribe((res: any) => this.translated = res['translated'])
    );
  }

  onNotificationsChange(event: any) {
    if (this.notifications) {
      this.notificationService.requestPermission().then((value) => {
        this.notificationService.showNotification(Strings.notifications);
      });
    }
  }

  logout() {
    localStorage.clear();
    this.messageService.clearMessages();
    this.router.navigate(['']);
  }

  onLogoutButtonClicked() {
    this.modalService.open(
      Strings.logoutQuestion,
      'Are you sure want to log out from Unpredictifyr ?',
      [
        {
          distructive: false,
          label: Strings.cancel,
          onPressed: () => { },
        },
        {
          distructive: true,
          label: Strings.logout,
          onPressed: () => this.logout(),
          icon: 'box-arrow-left'
        },
      ],
    );
  }

  onDeleteMyAccountClicked() {
    this.modalService.open(
      'Delete you account ?',
      'Are you sure want to delete you account from Unpredictifyr ? \nWe are sad seeing you go 🙁',
      [
        {
          distructive: false,
          label: Strings.cancel,
          onPressed: () => { },
        },
        {
          distructive: true,
          label: Strings.delete,
          onPressed: () => this.deleteAccount(),
          icon: 'person-x'
        },
      ],
    );
  }

  deleteAccount() {
    const email = localStorage.getItem('email');
    const password = prompt('Your password ??');
    if (email && password) {
      this.authService.deleteAccount(email, password).subscribe((res: any) => {
        console.log(res);

        this.toastService.show(res['message']);
      });
    }
    console.log(password);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
