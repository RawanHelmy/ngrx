import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ArticleInterface } from 'src/app/shared/types/article.interface';
import { ArticleRequestInterface } from 'src/app/shared/types/articleRequest.Interface';
import { BackendErrorsInterface } from 'src/app/shared/types/backendErrors.interface';

export const edtiArticleActions = createActionGroup({
  source: 'edit article',
  events: {
    'edit article': props<{ request: ArticleRequestInterface; slug: string }>(),
    'edit article success': props<{ article: ArticleInterface }>(),
    'edit article failure': props<{ errors: BackendErrorsInterface }>(),
    'get article': props<{ slug: string }>(),
    'get article success': props<{ article: ArticleInterface }>(),
    'get article failure': emptyProps(),
  },
});
