import { createFeature, createReducer, on } from '@ngrx/store';
import { routerNavigationAction } from '@ngrx/router-store';
import { SettingsStateInterface } from '../types/settingsState.interface';
import { authActions } from 'src/app/auth/store/actions';

const initialState: SettingsStateInterface = {
  isSubmitting: false,

  validationErrors: null,
};
const settingsFeature = createFeature({
  name: 'settings',
  reducer: createReducer(
    initialState,
    on(authActions.updateUser, (state) => ({
      ...state,
      isSubmitting: true,
    })),
    on(authActions.updateUserSuccess, (state) => ({
      ...state,
      isSubmitting: false,
    })),
    on(authActions.updateUserFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    })),
    on(routerNavigationAction, (state) => ({
      ...state,
    }))
  ),
});

export const {
  name: settingsFeatureKey,
  reducer: settingsReducer,
  selectIsSubmitting,
  selectValidationErrors,
} = settingsFeature;
