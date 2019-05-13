import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from '../account/account.service';

@Injectable()
export class TodoGuard implements CanActivate {
  constructor(private account: AccountService) {}

  canActivate(): Observable<boolean> | boolean {
    return this.account.isAuthenticated();
  }
}
