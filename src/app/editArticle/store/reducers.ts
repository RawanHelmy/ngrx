import { createFeature, createReducer, on } from '@ngrx/store';
import { routerNavigationAction } from '@ngrx/router-store';
import { EditArticleStateInterface } from '../types/editArticleState.interface';
import { edtiArticleActions } from './actions';

const initialState: EditArticleStateInterface = {
  isSubmitting: false,
  validationErrors: null,
  isLoading: false,
  article: null,
};

const editArticleFeature = createFeature({
  name: 'edit article',
  reducer: createReducer(
    initialState,
    on(edtiArticleActions.editArticle, (state) => ({
      ...state,
      isSubmitting: true,
    })),
    on(edtiArticleActions.editArticleSuccess, (state, action) => ({
      ...state,
      isSubmitting: false,
      article: action.article,
    })),
    on(edtiArticleActions.editArticleFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    })),
    on(edtiArticleActions.getArticle, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(edtiArticleActions.getArticleSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      article: action.article,
    })),
    on(edtiArticleActions.getArticleFailure, (state, action) => ({
      ...state,
      isLoading: false,
    })),
    on(routerNavigationAction, () => initialState)
  ),
});

export const {
  name: editArticleFeatureKey,
  reducer: editArticleReducer,
  selectIsSubmitting,
  selectValidationErrors,
  selectIsLoading,
  selectArticle,
} = editArticleFeature;
