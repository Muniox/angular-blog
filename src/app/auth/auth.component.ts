import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  authForm = new FormGroup({
    username: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    //check query params and set mode
    const isLogingMode: string =
      this.route.snapshot.queryParams['isLoggingMode'];
    if (isLogingMode === 'true') {
      this.isLoginMode = true;
    }
    if (isLogingMode === 'false') {
      this.isLoginMode = false;
    }

    //check what current mode is
    if (!this.isLoginMode) {
      const usernameInput = this.authForm.controls.username;
      usernameInput.setValidators([Validators.required]);
    }
  }

  onSubmit() {
    //prevent from sending invalid data
    if (this.authForm.invalid) {
      return;
    }

    // check mode for submit data
    if (this.isLoginMode) {
      this.authService.login(
        this.authForm.controls.email.value,
        this.authForm.controls.password.value
      );
    } else {
      this.authService.register(
        this.authForm.controls.email.value,
        this.authForm.controls.username.value,
        this.authForm.controls.password.value
      );
    }
  }

  changeMode() {
    //change mode
    this.isLoginMode = !this.isLoginMode;

    //check what current mode is and set validators
    if (!this.isLoginMode) {
      const usernameInput = this.authForm.controls.username;
      usernameInput.setValidators([Validators.required]);
    }
    //check what current mode is and remove validators
    if (this.isLoginMode) {
      const usernameInput = this.authForm.controls.username;
      usernameInput.clearValidators();
    }

    //clear form
    this.authForm.reset();

    //update query params
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { isLoginMode: this.isLoginMode },
    });
  }
}
