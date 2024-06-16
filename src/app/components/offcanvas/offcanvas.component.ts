import { Component, inject, Input } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-offcanvas',
  standalone: true,
  imports: [],
  templateUrl: './offcanvas.component.html',
  styleUrl: './offcanvas.component.scss'
})
export class OffcanvasComponent {
  private offcanvas = inject(NgbOffcanvas);

  @Input() title?: string;
  @Input() body?: string;

  close() {
    this.offcanvas.dismiss();
  }
}
