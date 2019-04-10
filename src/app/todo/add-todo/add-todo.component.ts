import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { priorities } from '../todo.interface';
import { TodoService } from '../todo.service';

@Component({
  selector: 'add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss'],
})
export class AddTodoComponent implements OnInit {
  public addForm: FormGroup;

  public priorities = priorities;

  get priority() {
    return this.addForm.get('priority');
  }
  get title() {
    return this.addForm.get('title');
  }
  get description() {
    return this.addForm.get('description');
  }

  constructor(private fb: FormBuilder, private todo: TodoService) {}

  ngOnInit() {
    this.addForm = this.fb.group({
      priority: ['', Validators.required],
      title: ['', [Validators.minLength(5), Validators.required]],
      description: ['', Validators.required],
      done: [false],
    });
  }

  submit({ value, valid }): void {
    if (valid) {
      this.todo.add(value);
      this.addForm.reset();
    }
  }
}
