import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {


  ngOnInit(): void {
    const theme = localStorage.getItem('theme') ?? 'dark';
    const html = document.querySelector('html');
    if (html) html.dataset['bsTheme'] = theme;
  }


  title = 'unpredictifyr-web';
}
