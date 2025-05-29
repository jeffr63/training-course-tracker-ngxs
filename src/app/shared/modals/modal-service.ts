import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  #deleteModalOptions = {
    title: '',
    body: '',
    warning: '',
  };

  setDeleteModalOptions(options: any) {
    this.#deleteModalOptions = options;
  }

  getDeleteModalOtions(): any {
    return this.#deleteModalOptions;
  }
}
