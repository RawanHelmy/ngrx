import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { authActions } from './actions';
import { catchError, map, of, pipe, switchMap, tap } from 'rxjs';
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.inteface';
import { HttpErrorResponse } from '@angular/common/http';
import { PersistanceService } from 'src/app/shared/services/persistance.service';
import { Router } from '@angular/router';

export const registerEffect = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(AuthService),
    presistanceService = inject(PersistanceService)
  ) => {
    return actions$.pipe(
      ofType(authActions.register),
      switchMap((user) => {
        return authService.register(user).pipe(
          map((currentUser: CurrentUserInterface) => {
            presistanceService.set('token', currentUser.token);
            return authActions.registerSuccess({ user: currentUser });
          }),
          catchError((err: HttpErrorResponse) => {
            return of(
              authActions.registerFailure({
                errors: err.error.errors,
              })
            );
          })
        );
      })
    );
  },
  { functional: true }
);
export const redirectAfterRegisterEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(authActions.registerSuccess),
      pipe(tap(() => router.navigateByUrl('/')))
    );
  },
  { functional: true, dispatch: false }
);
export const loginEffect = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(AuthService),
    presistanceService = inject(PersistanceService)
  ) => {
    return actions$.pipe(
      ofType(authActions.login),
      switchMap((user: any) => {
        return authService.login(user.user).pipe(
          map((currentUser: CurrentUserInterface) => {
            presistanceService.set('token', currentUser.token);
            return authActions.loginSuccess({ user: currentUser });
          }),
          catchError((err: HttpErrorResponse) => {
            return of(
              authActions.loginFailure({
                errors: err.error.errors,
              })
            );
          })
        );
      })
    );
  },
  { functional: true }
);
export const redirectAfterLoginEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(authActions.loginSuccess),
      pipe(tap(() => router.navigateByUrl('/')))
    );
  },
  { functional: true, dispatch: false }
);

export const getUserEffect = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(AuthService),
    presistanceService = inject(PersistanceService)
  ) => {
    return actions$.pipe(
      ofType(authActions.getUser),
      switchMap(() => {
        const token = presistanceService.get('token');
        if (!token) {
          return of(authActions.getUserFailure());
        }
        return authService.getUser().pipe(
          map((currentUser: CurrentUserInterface) => {
            return authActions.getUserSuccess({ user: currentUser });
          }),
          catchError(() => {
            return of(authActions.getUserFailure());
          })
        );
      })
    );
  },
  { functional: true }
);
export const updateUserEffect = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService)) => {
    return actions$.pipe(
      ofType(authActions.updateUser),
      switchMap(({ user }) => {
        return authService.updateUser(user).pipe(
          map((currentUser: CurrentUserInterface) => {
            return authActions.updateUserSuccess({ user: currentUser });
          }),
          catchError((err: HttpErrorResponse) => {
            return of(
              authActions.updateUserFailure({ errors: err.error.errors })
            );
          })
        );
      })
    );
  },
  { functional: true }
);

export const logoutEffect = createEffect(
  (
    actions$ = inject(Actions),
    presistanceService = inject(PersistanceService),
    router = inject(Router)
  ) => {
    return actions$.pipe(
      ofType(authActions.logout),
      tap(() => {
        presistanceService.set('token', '');
        router.navigateByUrl('/');
      })
    );
  },
  { functional: true, dispatch: false }
);
