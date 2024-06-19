import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ThemeToggleComponent } from '../../components/theme-toggle/theme-toggle.component';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { TranslationService } from '../../services/translation/translation.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-settings-page',
  standalone: true,
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.scss',
  imports: [FormsModule, ThemeToggleComponent, NavbarComponent, CommonModule]
})
export class SettingsPageComponent implements OnInit, OnDestroy {

  constructor(private router: Router, private translation: TranslationService) { }

  name: String = '';
  language = navigator.language.substring(0, 2);
  isDarkMode: boolean = true;
  notifications = true;
  translations = false;
  languages = {};
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
  }

  isLightTheme(): boolean {
    const html = document.querySelector('html');
    const theme = localStorage.getItem('theme') ?? html?.dataset['bsTheme'] ?? 'light';
    return theme == 'light';
  }

  onLanguageChange(event: any) {
    this.language = event.target.value;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
