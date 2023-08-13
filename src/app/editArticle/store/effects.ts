import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, of, tap, pipe } from 'rxjs';
import { Router } from '@angular/router';
import { edtiArticleActions } from './actions';
import { EditArticleService } from '../services/edit-article.service';
import { ArticlesService } from 'src/app/shared/services/articles.service';
import { ArticleInterface } from 'src/app/shared/types/article.interface';

export const articleEffect = createEffect(
  (actions$ = inject(Actions), articleService = inject(ArticlesService)) => {
    return actions$.pipe(
      ofType(edtiArticleActions.getArticle),
      switchMap(({ slug }) => {
        return articleService.getArticle(slug).pipe(
          map((article: ArticleInterface) => {
            return edtiArticleActions.getArticleSuccess({ article: article });
          }),
          catchError((err: HttpErrorResponse) => {
            return of(edtiArticleActions.getArticleFailure());
          })
        );
      })
    );
  },
  { functional: true }
);

export const editArticleEffect = createEffect(
  (
    actions$ = inject(Actions),
    editArticleService = inject(EditArticleService)
  ) => {
    return actions$.pipe(
      ofType(edtiArticleActions.editArticle),
      switchMap(({ request, slug }) => {
        return editArticleService.editArticle(request, slug).pipe(
          map((article) => {
            return edtiArticleActions.editArticleSuccess({ article });
          }),
          catchError((err: HttpErrorResponse) => {
            return of(
              edtiArticleActions.editArticleFailure({
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
export const redirectAfterEdit = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(edtiArticleActions.editArticleSuccess),
      pipe(
        tap(({ article }) => {
          router.navigate(['/articles', article.slug]);
        })
      )
    );
  },
  { functional: true, dispatch: false }
);
