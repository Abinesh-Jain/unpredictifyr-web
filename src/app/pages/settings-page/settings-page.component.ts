import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ThemeToggleComponent } from '../../components/theme-toggle/theme-toggle.component';
import { NavbarComponent } from "../../components/navbar/navbar.component";

@Component({
  selector: 'app-settings-page',
  standalone: true,
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.scss',
  imports: [FormsModule, ThemeToggleComponent, NavbarComponent]
})
export class SettingsPageComponent implements OnInit {

  constructor(private router: Router) { }

  name: String = '';
  language = navigator.language;
  isDarkMode: boolean = true;

  ngOnInit(): void {
    const name = localStorage.getItem('name');
    if (name) {
      this.name = this.tryParse(name);
    } else {
      this.router.navigate(['']);
    }
    this.isDarkMode = this.isLightTheme();
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

}
