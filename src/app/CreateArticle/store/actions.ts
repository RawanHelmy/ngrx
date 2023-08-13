import { createActionGroup, props } from '@ngrx/store';
import { ArticleInterface } from 'src/app/shared/types/article.interface';
import { ArticleRequestInterface } from 'src/app/shared/types/articleRequest.Interface';
import { BackendErrorsInterface } from 'src/app/shared/types/backendErrors.interface';

export const createArticleActions = createActionGroup({
  source: 'article',
  events: {
    'create article': props<{ request: ArticleRequestInterface }>(),
    'create article success': props<{ article: ArticleInterface }>(),
    'create article failure': props<{ errors: BackendErrorsInterface }>(),
  },
});
