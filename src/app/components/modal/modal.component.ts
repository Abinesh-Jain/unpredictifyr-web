import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

export interface Action {
  label: string,
  onPressed: VoidFunction,
  distructive: boolean,
  icon?: string,
}

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {

  @Input() title?: string;
  @Input() body?: string;
  @Input() actions: Action[] = [];

  constructor(private modal: NgbModal) { }

  close(onPressed?: VoidFunction) {
    this.modal.dismissAll();
    onPressed?.call(null)
  }

}
