import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, of } from 'rxjs';
import { tagActions } from './actions';
import { PopularTagsService } from '../services/popular-tags.service';

export const tagsEffects = createEffect(
  (actions$ = inject(Actions), tagService = inject(PopularTagsService)) => {
    return actions$.pipe(
      ofType(tagActions.getTags),
      switchMap(() => {
        return tagService.get().pipe(
          map((tags: string[]) => {
            return tagActions.getTagsSuccess({ tags });
          }),
          catchError((err: HttpErrorResponse) => {
            return of(tagActions.getTagsFailure());
          })
        );
      })
    );
  },
  { functional: true }
);
