import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-list-display',
  templateUrl: './list-display.component.html',
  styles: []
})
export class ListDisplayComponent implements OnInit {
  @Input() columns: string[];
  @Input() headers: string[];
  @Input() items: any[];
  @Input() isAuthenticated: boolean;
  @Output() deleteItem = new EventEmitter();
  @Output() editItem = new EventEmitter();

  faPencilAlt = faPencilAlt;
  faTrashAlt = faTrashAlt;

  constructor() { }

  ngOnInit() {
  }

  editClicked(id: number) {
    this.editItem.emit(id);
  }

  deleteClicked(id: number) {
    this.deleteItem.emit(id);
  }

}
