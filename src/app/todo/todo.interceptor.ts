import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AccountService } from '../account/account.service';

@Injectable()
export class TodoInterceptor implements HttpInterceptor {
  constructor(private account: AccountService) {}

  intercept(http: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.account.getToken().pipe(
      switchMap(token => {
        const request = http.clone({
          headers: new HttpHeaders({
            Authorization: `Bearer ${token}`,
          }),
        });

        return next.handle(request);
      })
    );
  }
}
