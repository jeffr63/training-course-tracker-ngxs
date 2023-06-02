import { Component, Output, EventEmitter } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-list-header',
  standalone: true,
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
export class ListHeaderComponent {
  @Output() newItem = new EventEmitter();

  newClicked() {
    this.newItem.emit();
  }
}
