import { Component, OnInit } from '@angular/core';
import { User } from '../types/user.interface';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';

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
