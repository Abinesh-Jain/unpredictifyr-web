import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastComponent } from "./components/toast/toast.component";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, ToastComponent]
})
export class AppComponent implements OnInit {


  ngOnInit(): void {
    const theme = localStorage.getItem('theme') ?? 'dark';
    const html = document.querySelector('html');
    if (html) html.dataset['bsTheme'] = theme;
  }


  title = 'unpredictifyr-web';
}
