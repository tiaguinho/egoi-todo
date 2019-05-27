import { Action } from '@ngrx/store';
import { HashTable, Todo } from '../todo.interface';

export const LOAD_TODO = '[TODO] load all todos';
export const TODO_LOADED = '[TODO] todo loaded from backend';

export const ERROR_TODO_MESSAGE = '[TODO ERROR] error on todo action';
export const CLEAR_TODO_ERROR_MESSAGE = '[TODO ERROR] clear error message';
export enum ErrorTypes {
  LOAD_TODO = 1,
  ADD_TODO,
  EDIT_TODO,
  DELETE_TODO,
  GET_TODO,
}

export const ADD_TODO = '[TODO] add todo';
export const TODO_ADDED = '[TODO] todo added to backend';

export const EDIT_TODO = '[TODO] edit todo';
export const TODO_EDITED = '[TODO] todo edited to backend';

export const DELETE_TODO = '[TODO] delete todo';
export const TODO_DELETED = '[TODO] todo deleted to backend';

export const SELECT_TODO = '[TODO] get todo';

export class LoadTodo implements Action {
  readonly type = LOAD_TODO;

  constructor() {}
}

export class TodoLoaded implements Action {
  readonly type = TODO_LOADED;

  constructor(public todos: HashTable) {}
}

export class ErrorTodoMessage implements Action {
  readonly type = ERROR_TODO_MESSAGE;

  constructor(public error_type: ErrorTypes) {}
}

export class ClearErrorTodoMessage implements Action {
  readonly type = CLEAR_TODO_ERROR_MESSAGE;

  constructor() {}
}

export class AddTodo implements Action {
  readonly type = ADD_TODO;

  constructor(public todo: Todo) {}
}

export class TodoAdded implements Action {
  readonly type = TODO_ADDED;

  constructor(public todo: Todo) {}
}

export class EditTodo implements Action {
  readonly type = EDIT_TODO;

  constructor(public id: string, public todo: Partial<Todo>) {}
}

export class TodoEdited implements Action {
  readonly type = TODO_EDITED;

  constructor(public todo: Todo) {}
}

export class DeleteTodo implements Action {
  readonly type = DELETE_TODO;

  constructor(public id: string) {}
}

export class TodoDeleted implements Action {
  readonly type = TODO_DELETED;

  constructor(public id: string) {}
}

export class SelectTodo implements Action {
  readonly type = SELECT_TODO;

  constructor(public id: string) {}
}

export type TodoActions =
  | LoadTodo
  | TodoLoaded
  | ErrorTodoMessage
  | ClearErrorTodoMessage
  | AddTodo
  | TodoAdded
  | EditTodo
  | TodoEdited
  | DeleteTodo
  | TodoDeleted
  | SelectTodo;
