import { CommonModule } from '@angular/common';
import {  Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import {  NgbModal, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

export interface Action {
  label: string,
  onPressed: VoidFunction,
  distructive: boolean,
  icon?: string,
}

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule,NgbTooltipModule],
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
