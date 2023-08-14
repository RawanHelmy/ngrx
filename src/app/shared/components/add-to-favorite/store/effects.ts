import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AddTofavoritesService } from 'src/app/shared/services/add-tofavorites.service';
import { addToFavoriteActions } from './actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { ArticleInterface } from 'src/app/shared/types/article.interface';
import { HttpErrorResponse } from '@angular/common/http';

export const addToFavoriteEffect = createEffect(
  (
    actions$ = inject(Actions),
    addToFavoriteService = inject(AddTofavoritesService)
  ) => {
    return actions$.pipe(
      ofType(addToFavoriteActions.addToFavorite),
      switchMap(({ isFavorited, slug }) => {
        const obs$ = !isFavorited
          ? addToFavoriteService.removeFromFavorite(slug)
          : addToFavoriteService.addToFavorite(slug);
        return obs$.pipe(
          map((article: ArticleInterface) => {
            return addToFavoriteActions.addToFavoriteSuccess({ article });
          }),
          catchError((err: HttpErrorResponse) => {
            return of(addToFavoriteActions.addToFavoriteFailure());
          })
        );
      })
    );
  },
  { functional: true }
);
