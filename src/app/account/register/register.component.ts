import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm = this.fb.group({
    name: [null, Validators.required],
    email: [null, [Validators.required, Validators.email]],
    password: [null, Validators.required],
  });

  constructor(private fb: FormBuilder, private account: AccountService, private router: Router) {}

  onSubmit({ value, valid }) {
    if (valid) {
      this.account.register(value).subscribe(status => {
        if (status === 201) {
          this.router.navigate(['account', 'login']);
        }
      });
    }
  }
}
