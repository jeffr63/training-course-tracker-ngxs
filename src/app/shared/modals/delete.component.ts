import { Component, OnInit, inject } from '@angular/core';
import { NgIf } from '@angular/common';

import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ModalDataService } from '@modals/modal-data.service';

@Component({
  selector: 'app-delete',
  standalone: true,
  imports: [NgIf, NgbModule],

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
        <i class="bi bi-trash3-fill"></i> Delete
      </button>
      <button class="btn btn-secondary" (click)="modal.dismiss()" title="Cancel">
        <i class="bi bi-x-circle"></i> Cancel
      </button>
    </div>
  `,
  styles: [],
})
export class DeleteComponent implements OnInit {
  modal = inject(NgbActiveModal);
  modalDataService = inject(ModalDataService);

  modalOptions = {
    title: '',
    body: '',
    warning: '',
  };

  ngOnInit() {
    this.modalOptions = this.modalDataService.getDeleteModalOtions();
  }
}
