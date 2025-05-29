import { Component, output } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-list-header',
  imports: [NgbModule],
  template: `
    <header class="row">
      <div class="col">&nbsp;</div>
      <div class="col">
        <button class="btn btn-sm" (click)="newClicked()" title="Add">
          <i class="bi bi-plus-circle-fill display-6 text-success"></i>
        </button>
      </div>
    </header>
  `,
  styles: [],
})
export class ListHeader {
  newItem = output();

  newClicked() {
    this.newItem.emit();
  }
}
