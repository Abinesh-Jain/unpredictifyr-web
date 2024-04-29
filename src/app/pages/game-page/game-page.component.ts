import { Component } from '@angular/core';
import { BoardComponent } from "../../components/board/board.component";

@Component({
  selector: 'app-game-page',
  standalone: true,
  templateUrl: './game-page.component.html',
  styleUrl: './game-page.component.scss',
  imports: [BoardComponent]
})
export class GamePageComponent {

}
