import { Component, Output, EventEmitter } from '@angular/core';

import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-list-header',
  templateUrl: './list-header.component.html',
  styles: []
})
export class ListHeaderComponent {
  @Output() newItem = new EventEmitter();
  faPlusCircle = faPlusCircle;

  newClicked() {
    this.newItem.emit();
  }

}
