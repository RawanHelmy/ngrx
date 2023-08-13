import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, of, tap, pipe } from 'rxjs';
import { Router } from '@angular/router';
import { createArticleActions } from './actions';
import { CreateArticleService } from '../services/create-article.service';

export const createArticleEffect = createEffect(
  (
    actions$ = inject(Actions),
    createArticleService = inject(CreateArticleService)
  ) => {
    return actions$.pipe(
      ofType(createArticleActions.createArticle),
      switchMap(({ request }) => {
        return createArticleService.createArticle(request).pipe(
          map((article) => {
            return createArticleActions.createArticleSuccess({ article });
          }),
          catchError((err: HttpErrorResponse) => {
            return of(
              createArticleActions.createArticleFailure({
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
export const redirectAfterCreate = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(createArticleActions.createArticleSuccess),
      pipe(
        tap(({ article }) => {
          router.navigate(['/articles', article.slug]);
        })
      )
    );
  },
  { functional: true, dispatch: false }
);
