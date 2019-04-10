import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.scss'],
})
export class EditTodoComponent implements OnChanges {
  @Input('id')
  set selectedID(id: number) {
    this._selecteID = id;
  }
  get selectedID(): number {
    return this._selecteID;
  }
  private _selecteID: number;

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }
}
