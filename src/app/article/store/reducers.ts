import { createFeature, createReducer, on } from '@ngrx/store';
import { routerNavigationAction } from '@ngrx/router-store';
import { ArticleStateInterface } from '../types/article.state.interface';
import { articleActions } from './actions';

const initialState: ArticleStateInterface = {
  isloading: false,
  error: null,
  article: null,
};

const feedFeature = createFeature({
  name: 'article',
  reducer: createReducer(
    initialState,
    on(articleActions.getArticle, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(articleActions.getArticleSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      error: null,
      feeds: action.article,
    })),
    on(articleActions.getArticleFailure, (state) => ({
      ...state,
      isLoading: false,
      error: '',
      feeds: null,
    })),
    on(routerNavigationAction, () => initialState)
  ),
});

export const {
  name: articleFeatureKey,
  reducer: articleReducer,
  selectArticle,
  selectError,
  selectIsloading,
} = feedFeature;
