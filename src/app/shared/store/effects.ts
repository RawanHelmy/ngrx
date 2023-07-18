import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, of } from 'rxjs';
import { feedActions } from './actions';
import { FeedService } from '../services/feed.service';
import { FeedResponseInterface } from '../types/feedResponse.interface';

export const feedEffect = createEffect(
  (actions$ = inject(Actions), feedService = inject(FeedService)) => {
    return actions$.pipe(
      ofType(feedActions.getFeed),
      switchMap(({ url }) => {
        return feedService.getFeed(url).pipe(
          map((feeds: FeedResponseInterface) => {
            return feedActions.getFeedSuccess({ feed: feeds });
          }),
          catchError((err: HttpErrorResponse) => {
            return of(feedActions.getFeedFailure());
          })
        );
      })
    );
  },
  { functional: true }
);
