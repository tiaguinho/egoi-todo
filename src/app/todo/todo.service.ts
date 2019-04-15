import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Todo } from './todo.interface';

@Injectable()
export class TodoService {
  private _count: number = 1;

  private _list: BehaviorSubject<Todo[]> = new BehaviorSubject([]);

  constructor() {}

  add(todo: Todo): void {
    todo.id = this._count++;
    const items = this._list.getValue();
    items.push({ ...todo });

    this._list.next(items);
  }

  edit(id: number, changes: Partial<Todo>): void {
    const items = this._list.getValue();
    const index = items.findIndex(item => item.id === id);
    items[index] = { ...items[index], ...changes };

    this._list.next(items);
  }

  remove(id: number): void {
    const items = this._list.getValue().filter(item => item.id !== id);
    this._list.next(items);
  }

  getTodo(id: number): Todo {
    return this._list.getValue().find(item => item.id === id);
  }

  list(): Observable<Todo[]> {
    return this._list.asObservable();
  }
}
