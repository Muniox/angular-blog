import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (
        error.status === 401 &&
        error.error.message === 'Authorization token has expired.'
      ) {
        return authService.refreshToken().pipe(
          switchMap(() => next(req)), // Retry the request after refreshing the token
          catchError((refreshError: HttpErrorResponse) => {
            // If refreshing the token fails, navigate to the login page
            if (
              error.status === 401 &&
              error.error.message === 'Refresh token has expired'
            ) {
              router.navigate(['/login']);
              return throwError(() => refreshError);
            }
          })
        );
      } else {
        return throwError(() => error);
      }
    })
  );
};
