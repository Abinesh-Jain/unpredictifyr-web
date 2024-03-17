import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ThemeToggleComponent } from '../../components/theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [FormsModule, ThemeToggleComponent],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.scss'
})
export class SettingsPageComponent implements OnInit {

  constructor(private router: Router) { }

  name: String = '';
  isDarkMode: boolean = true;

  ngOnInit(): void {
    const name = localStorage.getItem('name');
    if (name) {
      this.name = name;
    } else {
      this.router.navigate(['']);
    }
  }

  changeTheme(checked: boolean) {
    if (typeof checked !== 'boolean') return;
    const html = document.querySelector('html');
    if (html) {
      const theme = checked ? 'light' : 'dark';
      html.dataset['bsTheme'] = theme;
      localStorage.setItem('theme', theme);
      console.log(checked);
    }
  }

}
