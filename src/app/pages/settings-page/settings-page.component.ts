import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.scss'
})
export class SettingsPageComponent implements OnInit {

  constructor(private router: Router) {

  }

  name: String = '';

  ngOnInit(): void {
    const name = localStorage.getItem('name');
    if (name) {
      this.name = name;
    } else {
      this.router.navigate(['']);
    }

  }

}
