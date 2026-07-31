import { Service } from '@angular/core';

@Service()
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
