import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    // Form initialization
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  submitLogin(): void {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      console.log('Login submitted', formData);

      // TODO: Kirim data ke backend API untuk autentikasi
      // this.authService.login(formData).subscribe(...)
    } else {
      console.log('Form is not valid');
    }
  }
}
