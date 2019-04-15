import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { priorities } from '../todo.interface';
import { TodoService } from '../todo.service';

@Component({
  selector: 'edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.scss'],
})
export class EditTodoComponent implements OnInit, OnChanges {
  @Input('id')
  set selectedID(id: number) {
    this._selecteID = id;
  }
  get selectedID(): number {
    return this._selecteID;
  }
  private _selecteID: number;

  public priorities = priorities;

  get priority() {
    return this.editForm.get('priority');
  }
  get title() {
    return this.editForm.get('title');
  }
  get description() {
    return this.editForm.get('description');
  }

  editForm: FormGroup;

  constructor(private todo: TodoService, private fb: FormBuilder) {}

  ngOnInit() {
    this.editForm = this.fb.group({
      id: [''],
      priority: ['', Validators.required],
      title: ['', [Validators.minLength(5), Validators.required]],
      description: ['', Validators.required],
      done: [false],
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedID'].currentValue) {
      const todo = this.todo.getTodo(this._selecteID);
      this.editForm.setValue(todo);
    }
  }

  submit({ value, valid }): void {
    if (valid) {
      this.todo.edit(this._selecteID, value);
      this.editForm.reset();
    }
  }
}
