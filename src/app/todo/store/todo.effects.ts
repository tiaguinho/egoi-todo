import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of, zip } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { HashTable, Todo } from '../todo.interface';
import * as fromTodoActions from './todo.actions';
import { TodoState } from './todo.reducer';

@Injectable()
export class TodoEffects {
  private _endpoint: string;

  @Effect()
  load$ = this.actions.pipe(
    ofType<fromTodoActions.LoadTodo>(fromTodoActions.LOAD_TODO),
    switchMap(() => this.http.get(this._endpoint)),
    map((response: any) => {
      let table: HashTable = {};

      response.data.forEach((todo: Todo) => {
        // um utilizador (no problem) / multiplos utilizadores (problem!)
        if (!table[todo.id]) {
          table[todo.id] = todo;
        }
      });

      return new fromTodoActions.TodoLoaded(table);
    })
  );

  @Effect()
  add$ = this.actions.pipe(
    ofType<fromTodoActions.AddTodo>(fromTodoActions.ADD_TODO),
    switchMap(action => this.http.post(this._endpoint, action.todo)),
    map((response: any) => {
      return new fromTodoActions.TodoAdded(response.data);
    })
  );

  @Effect()
  edit$ = this.actions.pipe(
    ofType<fromTodoActions.EditTodo>(fromTodoActions.EDIT_TODO),
    switchMap(action => this.http.put(`${this._endpoint}/${action.id}`, action.todo)),
    map((response: any) => {
      return new fromTodoActions.TodoEdited(response.data);
    })
  );

  @Effect()
  delete$ = this.actions.pipe(
    ofType<fromTodoActions.DeleteTodo>(fromTodoActions.DELETE_TODO),
    switchMap(action => zip(of(action), this.http.delete(`${this._endpoint}/${action.id}`))),
    map(([action, response]) => {
      if ((<any>response).code === 200) {
        return new fromTodoActions.DeleteTodo(action.id);
      }

      return new fromTodoActions.ErrorTodoMessage(fromTodoActions.ErrorTypes.DELETE_TODO);
    })
  );

  constructor(private http: HttpClient, private store: Store<TodoState>, private actions: Actions) {
    // set base endpoint
    this._endpoint = `${environment.URL}/todo`;
  }
}
