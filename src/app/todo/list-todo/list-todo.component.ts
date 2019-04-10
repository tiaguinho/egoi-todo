import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Todo } from '../todo.interface';
import { TodoService } from '../todo.service';

@Component({
  selector: 'list-todo',
  templateUrl: './list-todo.component.html',
  styleUrls: ['./list-todo.component.scss'],
})
export class ListTodoComponent implements OnInit {
  todos: Todo[] = [];

  @Output() onEditClick = new EventEmitter();

  constructor(private todo: TodoService) {}

  ngOnInit() {
    this.todos = this.todo.list();
  }

  remove(id: number): void {
    this.todo.remove(id);
    this.todos = this.todo.list();
  }

  edit(id: number): void {
    this.onEditClick.emit(id);
  }
}
