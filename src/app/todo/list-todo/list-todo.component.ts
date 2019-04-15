import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
// import { Subscription } from 'rxjs';
import { Todo } from '../todo.interface';
import { TodoService } from '../todo.service';

@Component({
  selector: 'list-todo',
  templateUrl: './list-todo.component.html',
  styleUrls: ['./list-todo.component.scss'],
})
export class ListTodoComponent implements OnInit, OnDestroy {
  /*
  todos: Todo[] = [];
  private subscription: Subscription;
  */

  todos$: Observable<Todo[]>;

  @Output() onEditClick = new EventEmitter();

  constructor(private todo: TodoService) {}

  ngOnInit() {
    //this.subscription = this.todo.list().subscribe(items => (this.todos = items));
    this.todos$ = this.todo.list();
  }

  ngOnDestroy() {
    /*
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }
    */
  }

  remove(id: number): void {
    this.todo.remove(id);
  }

  edit(id: number): void {
    this.onEditClick.emit(id);
  }

  markAsDone(id: number): void {
    this.todo.edit(id, { done: true });
  }
}
