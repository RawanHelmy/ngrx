import { createFeature, createReducer, on } from '@ngrx/store';
import { routerNavigationAction } from '@ngrx/router-store';
import { TageStateInterface } from '../types/tagsState.interface';
import { tagActions } from './actions';

const initialState: TageStateInterface = {
  isLoading: false,
  error: null,
  tags: null,
};

const tagFeature = createFeature({
  name: 'tag',
  reducer: createReducer(
    initialState,
    on(tagActions.getTags, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(tagActions.getTagsSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      error: null,
      tags: action.tags,
    })),
    on(tagActions.getTagsFailure, (state) => ({
      ...state,
      isLoading: false,
      error: '',
      tags: null,
    }))
    // on(routerNavigationAction, () => initialState)
  ),
});

export const {
  name: tagFeatureKey,
  reducer: tagReducer,
  selectIsLoading: selectIsLoadingTags,
  selectError: selectErrorTags,
  selectTags,
} = tagFeature;
