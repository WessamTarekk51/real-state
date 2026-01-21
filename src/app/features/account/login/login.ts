import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CheckToken } from 'src/app/core/services/check-token';
import { AccountSevices } from '../account-sevices';
import { CommonModule, NgIf } from '@angular/common';
import { ControlMessages } from "src/app/shared/components/control-messages/control-messages";

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, NgIf, ControlMessages,CommonModule],
  standalone: true,
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {

  loginUser: FormGroup;
  errorMessage: string = '';

  private checkToken = inject(CheckToken);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  constructor(private accountService: AccountSevices) {
    this.loginUser = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe : [ true]
    });
  }

  submit() {
    this.errorMessage = '';
    if (this.loginUser.invalid) {
      this.loginUser.markAllAsTouched();
      return;
    }
    const user = this.loginUser.value;
    this.accountService.login(user).subscribe({
      next: (res: any) => {
        // Assuming API returns token in res.token
        if (res.value.token.accessToken) {
          this.checkToken.login(res.value.token.accessToken); // يخزن token ويوجه للـ home
          this.router.navigate(['/home']);
        } else {
          this.errorMessage = 'المستخدم أو كلمة السر غير صحيحة';
        }
      },
      error: (err: any) => {
        if (err?.error?.message) {
          this.errorMessage = err.error.message;
        } else {
          this.errorMessage = 'المستخدم أو كلمة السر غير صحيحة';
        }
      }
    });
  }

  // Helper للـ form control
  get f() {
    return this.loginUser.controls;
  }
}
