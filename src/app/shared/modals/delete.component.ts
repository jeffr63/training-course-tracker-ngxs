import { Component, OnInit, inject } from '@angular/core';

import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ModalDataService } from '@modals/modal-data.service';

@Component({
    selector: 'app-delete',
    imports: [NgbModule],
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
        @if (modalOptions.warning) {
        <span class="text-danger">{{ modalOptions.warning }}</span>
        }
      </p>
    </div>
    <div class="modal-footer">
      <button class="btn btn-danger" (click)="modal.close('delete')" title="Delete"><i class="bi bi-trash3-fill"></i> Delete</button>
      <button class="btn btn-secondary" (click)="modal.dismiss()" title="Cancel"><i class="bi bi-x-circle"></i> Cancel</button>
    </div>
  `,
    styles: []
})
export class DeleteComponent implements OnInit {
  protected readonly modal = inject(NgbActiveModal);
  readonly #modalDataService = inject(ModalDataService);

  protected modalOptions = {
    title: '',
    body: '',
    warning: '',
  };

  ngOnInit() {
    this.modalOptions = this.#modalDataService.getDeleteModalOtions();
  }
}
