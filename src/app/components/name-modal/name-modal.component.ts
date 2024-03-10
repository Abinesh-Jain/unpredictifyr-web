import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-name-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './name-modal.component.html',
  styleUrl: './name-modal.component.scss'
})
export class NameModalComponent {
  @Output() nameEntered = new EventEmitter<string>();
  userName: string = '';

  constructor() { }

  submitName() {
    this.nameEntered.emit(this.userName);
    this.userName = '';
  }
}

