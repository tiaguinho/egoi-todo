import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm = this.fb.group({
    email: [null, Validators.required],
    password: [null, Validators.required],
  });

  constructor(private fb: FormBuilder, private account: AccountService, private router: Router) {}

  onSubmit({ value, valid }) {
    if (valid) {
      this.account.login(value.email, value.password).subscribe(success => {
        if (success) {
          this.router.navigate(['todo']);
        }
      });
    }
  }
}
