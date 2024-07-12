import { Component, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class RegisterPageComponent {
  registerForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  registerUser() {
    this.authService.register(
      this.registerForm.controls.email.value,
      this.registerForm.controls.username.value,
      this.registerForm.controls.password.value
    );
  }
}
