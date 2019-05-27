import { HashTable } from '../todo.interface';
import * as fromTodoActions from './todo.actions';

export interface TodoState {
  selected: string | null;
  entities: HashTable;
  error_message: string | null;
}

const init = {
  selected: null,
  entities: {},
  error_message: null,
};

export function reducer(state: TodoState = init, action: fromTodoActions.TodoActions) {
  switch (action.type) {
    case fromTodoActions.TODO_LOADED: {
      return {
        ...state,
        entities: action.todos,
      };
    }

    case fromTodoActions.TODO_ADDED: {
      const entities = { ...state.entities };
      entities[action.todo.id] = action.todo;

      return {
        ...state,
        entities,
      };
    }

    case fromTodoActions.TODO_EDITED: {
      const entities = { ...state.entities };
      entities[action.todo.id] = {
        ...entities[action.todo.id],
        ...action.todo,
      };

      return {
        ...state,
        entities,
      };
    }

    case fromTodoActions.TODO_DELETED: {
      const entities = { ...state.entities };
      delete entities[action.id];

      return {
        ...state,
        entities,
      };
    }

    case fromTodoActions.SELECT_TODO: {
      return {
        ...state,
        selected: action.id,
      };
    }

    case fromTodoActions.ERROR_TODO_MESSAGE: {
      let error_message: string;
      switch (action.error_type) {
        case fromTodoActions.ErrorTypes.LOAD_TODO:
          error_message = 'Falha ao carregar todos';
          break;

        case fromTodoActions.ErrorTypes.ADD_TODO:
          error_message = 'Falha ao adicionar todo';
          break;

        case fromTodoActions.ErrorTypes.EDIT_TODO:
          error_message = 'Falha ao editar todo';
          break;

        case fromTodoActions.ErrorTypes.DELETE_TODO:
          error_message = 'Falha ao remover todo';
          break;

        case fromTodoActions.ErrorTypes.GET_TODO:
          error_message = 'Falha ao selecioner todo';
          break;

        default:
          error_message = 'Erro desconhecido';
      }

      return {
        ...state,
        error_message,
      };
    }

    case fromTodoActions.CLEAR_TODO_ERROR_MESSAGE: {
      return {
        ...state,
        error_message: null,
      };
    }

    default:
      return state;
  }
}
