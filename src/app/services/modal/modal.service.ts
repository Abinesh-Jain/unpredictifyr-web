import { Injectable } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent, Action } from '../../components/modal/modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private modal: NgbModal) { }

  open(title: string, body: string, actions: Action[], options?: NgbModalOptions) {
    const modalRef = this.modal.open(ModalComponent, options ?? {
      centered: true
    });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.body = body;
    modalRef.componentInstance.actions = actions;
    return modalRef.result;
  }

  close() {
    this.modal.dismissAll();
  }

}
