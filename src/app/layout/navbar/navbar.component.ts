import { Component, OnInit } from '@angular/core';
import { User } from '../../core/types/user.interface';

import { Observable } from 'rxjs';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  user$: Observable<User> | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.checkUserInLocalStorage();
    this.user$ = this.authService.user$;
  }

  logoutUser(): void {
    this.authService.logout();
  }
}
