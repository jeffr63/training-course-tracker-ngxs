import { Component, Output, EventEmitter } from "@angular/core";

import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-list-header",

  template: `
    <header class="row">
      <div class="col">&nbsp;</div>
      <div class="col">
        <button class="btn btn-sm" (click)="newClicked()" title="Add Path">
          <fa-icon [icon]="faPlusCircle" class="fa-2x text-success"></fa-icon>
          <span class="sr-only">Add Path</span>
        </button>
      </div>
    </header>
  `,

  styles: [],
})
export class ListHeaderComponent {
  @Output() newItem = new EventEmitter();
  faPlusCircle = faPlusCircle;

  newClicked() {
    this.newItem.emit();
  }
}
