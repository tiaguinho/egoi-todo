import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

interface Account {
  id?: string;
  name: string;
  email: string;
  password?: string;
}

interface AccessToken {
  access_token: string;
  exp: string;
}

const TOKEN = 'accessToken';

@Injectable()
export class AccountService {
  private acc: BehaviorSubject<AccessToken> = new BehaviorSubject<AccessToken>(null);

  constructor(private http: HttpClient) {
    const accessToken = window.localStorage.getItem(TOKEN);
    if (accessToken) {
      this.acc.next(JSON.parse(accessToken) as AccessToken);
    }
  }

  login(email: string, password: string): Observable<boolean> {
    // /auth
    // { email: string, password: string }
    return this.http.post(`${environment.URL}/auth`, { email, password }).pipe(
      map((resp: any) => {
        if (resp.code === 200) {
          this.acc.next(resp.data);

          // persistencia
          window.localStorage.setItem(TOKEN, JSON.stringify(resp.data));

          return true;
        }

        return false;
      })
    );
    // fazer request HTTP
    // success: setar user
    // falha:
    //  - email/password incorretos
    //  - email inexistente
    //  - validar se usuario está logado
  }

  register(acc: Account): Observable<number> {
    return this.http
      .post(`${environment.URL}/register`, acc)
      .pipe(map((resp: any) => <number>resp.code));
    // fazer request HTTP
    // success: redirect para login
    // falha:
    //  - já existente
    //  - email invalido
    //  - tamanho  minimo da password
    //  - password match
  }

  isAuthenticated(): Observable<boolean> {
    return this.acc.asObservable().pipe(
      map(data => {
        return data && data.access_token !== '';
      })
    );
  }

  getToken(): Observable<string> {
    return this.acc.asObservable().pipe(map(data => data.access_token));
  }
}
