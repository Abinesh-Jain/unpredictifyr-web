import { Injectable } from '@angular/core';
import { NgbOffcanvas, NgbOffcanvasOptions } from '@ng-bootstrap/ng-bootstrap';
import { OffcanvasComponent } from '../../components/offcanvas/offcanvas.component';

@Injectable({
  providedIn: 'root'
})
export class OffcanvasService {

  constructor(private offcanvas: NgbOffcanvas) { }

  open(title: string, body: string, options?: NgbOffcanvasOptions) {
    const ref = this.offcanvas.open(OffcanvasComponent, options);
    ref.componentInstance.title = title;
    ref.componentInstance.body = body;
    return ref.result;
  }

  close() {
    this.offcanvas.dismiss();
  }
}
