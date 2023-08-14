import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ArticleInterface } from 'src/app/shared/types/article.interface';

export const addToFavoriteActions = createActionGroup({
  source: 'add to favorite',
  events: {
    'add to favorite': props<{ isFavorited: boolean; slug: string }>(),
    'add to favorite success': props<{ article: ArticleInterface }>(),
    'add to favorite failure': emptyProps(),
  },
});
