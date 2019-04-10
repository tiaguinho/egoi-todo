import { Injectable } from '@angular/core';
import { Todo } from './todo.interface';

@Injectable()
export class TodoService {
  private _count: number = 1;

  private _list: Todo[] = [];

  constructor() {}

  add(todo: Todo): void {
    todo.id = this._count++;
    this._list.push({ ...todo });
  }

  edit(id: number, todo: Todo): void {
    const index = this._list.findIndex(item => item.id === id);
    this._list[index] = todo;
  }

  remove(id: number): void {
    this._list = this._list.filter(item => item.id !== id);
  }

  get(id: number): Todo {
    return this._list.find(item => item.id === id);
  }

  list(): Todo[] {
    return this._list;
  }
}
