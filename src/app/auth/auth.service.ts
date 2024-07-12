import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../types/user.interface';
import { environment } from '../../environments/environment';
import { UserRegister } from '../types/user-register.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  readonly user$: Observable<User> = this.userSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(email: string, password: string): void {
    this.http
      .post<User>(environment.blogApiUrl + '/auth/login', {
        email,
        password,
      })
      .subscribe(user => {
        this.userSubject.next(user);
        console.log(user);
      });
  }

  register(email: string, username: string, password: string): void {
    this.http
      .post<UserRegister>(environment.blogApiUrl + '/auth/register', {
        email,
        username,
        password,
      })
      .subscribe();
  }
}
