import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ModalDataService } from './modal-data.service';

@Component({
  selector: 'app-delete',
  standalone: true,
  imports: [CommonModule, NgbModule],

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
  modalOptions = {
    title: '',
    body: '',
    warning: '',
  };

  constructor(public modal: NgbActiveModal, private modalDataService: ModalDataService) {}

  ngOnInit() {
    this.modalOptions = this.modalDataService.getDeleteModalOtions();
  }
}
