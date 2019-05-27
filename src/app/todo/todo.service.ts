import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HashTable, Todo } from './todo.interface';

/**
 * ENDPOINTS
 *
 * /todo     - GET, POST
 * /todo/:id - GET, PUT, DELETE
 *
 *
 * HEADERS
 *
 *      KEY           VALUE
 * Authorization Bearer TOKEN
 *    - TOKEN = string... string != objeto
 *
 * O(n)
 * O(1)
 *
 * O(log n)
 * O(n^2)
 *
 */
@Injectable()
export class TodoService {
  private _endpoint: string;

  private _store: BehaviorSubject<HashTable> = new BehaviorSubject<HashTable>({});

  get values(): HashTable {
    return { ...this._store.getValue() };
  }

  constructor(private http: HttpClient) {
    // set base endpoint
    this._endpoint = `${environment.URL}/todo`;
  }

  list(): Observable<Todo[]> {
    return this._store.asObservable().pipe(
      map((data: HashTable) =>
        Object.keys(data)
          .map(key => data[key])
          .sort((a, b) => (a.created > b.created ? 1 : -1))
      )
    );
  }

  load(): void {
    this.http
      .get(this._endpoint)
      .pipe(map((response: any) => <Todo[]>response.data))
      .subscribe(todos => {
        const data = this.values;
        todos.forEach(todo => {
          // um utilizador (no problem) / multiplos utilizadores (problem!)
          if (!data[todo.id]) {
            data[todo.id] = todo;
          }
        });

        this._store.next(data);
      });
  }

  getTodo(id: string): Observable<Todo> {
    return this._store.asObservable().pipe(
      map(todos => todos[id]),
      switchMap(todo => {
        if (!todo) {
          return this.http
            .get(`${this._endpoint}/${id}`)
            .pipe(map((response: any) => <Todo>response.data));
        }

        return of(todo);
      })
    );
  }

  add(todo: Todo): Observable<Todo> {
    return this.http.post(this._endpoint, todo).pipe(
      map((response: any) => <Todo>response.data),
      map((todo: Todo) => {
        const data = this.values;
        data[todo.id] = todo;

        this._store.next(data);

        return todo;
      })
    );
  }

  edit(id: string, todo: Partial<Todo>): Observable<Todo> {
    return this.http.put(`${this._endpoint}/${id}`, todo).pipe(
      map((response: any) => <Todo>response.data),
      map((todo: Todo) => {
        const data = this.values;
        data[todo.id] = todo;

        this._store.next(data);

        return todo;
      })
    );
  }

  remove(id: string): Observable<boolean> {
    return this.http.delete(`${this._endpoint}/${id}`).pipe(
      map((response: any) => response.code === 200),
      map(deleted => {
        if (deleted) {
          const data = this.values;
          delete data[id];

          this._store.next(data);
        }

        return deleted;
      })
    );
  }
}
