import { Component, Output, EventEmitter } from "@angular/core";

@Component({
  selector: 'app-list-header',

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
