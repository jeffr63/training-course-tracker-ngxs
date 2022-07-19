import { Component, Input, OnInit } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { faBan, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { ModalDataService } from './modal-data.service';

@Component({
  selector: 'app-delete',
  template: `
    <div class="modal-header">
      <h5 class="modal-title">Delete?</h5>
    </div>
    <div class="modal-body">
      <p>
        <strong>{{ modalOptions.title }}</strong>
      </p>
      <p>
        {{ modalOptions.body }}
        <span class="text-danger" *ngIf="modalOptions.warning">{{ modalOptions.warning }}</span>
      </p>
    </div>
    <div class="modal-footer">
      <button class="btn btn-danger" (click)="modal.close('delete')" title="Delete">
        <fa-icon [icon]="faTrashAlt"></fa-icon> Delete
      </button>
      <button class="btn btn-secondary" (click)="modal.dismiss()" title="Cancel">
        <fa-icon [icon]="faBan"></fa-icon> Cancel
      </button>
    </div>
  `,
  styles: [],
})
export class DeleteComponent implements OnInit {
  modalOptions = {
    title: '',
    body: '',
    warning: '',
  };
  faTrashAlt = faTrashAlt;
  faBan = faBan;

  constructor(public modal: NgbActiveModal, private modalDataService: ModalDataService) {}

  ngOnInit() {
    this.modalOptions = this.modalDataService.getDeleteModalOtions();
  }
}
