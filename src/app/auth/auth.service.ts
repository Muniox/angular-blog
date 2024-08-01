import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../types/user.interface';
import { environment } from '../../environments/environment';
import { UserRegister } from '../types/user-register.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  readonly user$: Observable<User> = this.userSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  checkUserInLocalStorage() {
    const user = JSON.parse(localStorage.getItem('user'));
    return user ? this.userSubject.next(user) : this.userSubject.next(null);
  }

  login(email: string, password: string): void {
    this.http
      .post<User>(
        environment.blogApiUrl + '/auth/login',
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      )
      .pipe(
        tap(user => {
          localStorage.setItem('user', JSON.stringify(user));
        })
      )
      .subscribe(user => {
        this.userSubject.next(user);
        this.router.navigate(['/']);
      });
  }

  register(email: string, username: string, password: string): void {
    this.http
      .post<UserRegister>(environment.blogApiUrl + '/auth/register', {
        email,
        username,
        password,
      })
      .subscribe(() => {
        this.router.navigate(['/auth'], { queryParams: { isLoginMode: true } });
      });
  }

  logout(): void {
    localStorage.removeItem('user');
    this.userSubject.next(null);
  }
}
