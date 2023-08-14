import { createFeature, createReducer, on } from '@ngrx/store';
import { AuthStateInterface } from '../types/authState.interface';
import { authActions } from './actions';
import { BackendErrorsInterface } from 'src/app/shared/types/backendErrors.interface';
import { routerNavigationAction } from '@ngrx/router-store';

const initialState: AuthStateInterface = {
  isSubmitting: false,
  isloading: false,
  validationErrors: null,
  currentUser: undefined,
};
const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,
    on(authActions.register, (state) => ({
      ...state,
      isSubmitting: true,
      isloading: true,
      validationErrors: null,
    })),
    on(authActions.registerSuccess, (state, action) => ({
      ...state,
      isSubmitting: false,
      isloading: false,
      validationErrors: null,
      currentUser: action.user,
    })),
    on(authActions.registerFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      isloading: false,
      validationErrors: action.errors,
    })),
    on(authActions.login, (state) => ({
      ...state,
      isSubmitting: true,
      isloading: true,
      validationErrors: null,
    })),
    on(authActions.loginSuccess, (state, action) => ({
      ...state,
      isSubmitting: false,
      isloading: false,
      validationErrors: null,
      currentUser: action.user,
    })),
    on(authActions.registerFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      isloading: false,
      validationErrors: action.errors,
    })),
    on(routerNavigationAction, (state) => ({
      ...state,
      isSubmitting: false,
      isloading: false,
      validationErrors: null,
    })),
    on(authActions.getUser, (state) => ({
      ...state,
      isloading: true,
    })),
    on(authActions.getUserSuccess, (state, action) => ({
      ...state,
      isloading: false,
      currentUser: action.user,
    })),
    on(authActions.getUserFailure, (state) => ({
      ...state,
      isloading: false,
      currentUser: null,
    })),
    on(authActions.logout, (state) => ({
      ...state,
      currentUser: null,
    }))
  ),
});

export const {
  name: authFeatureKey,
  reducer: authReducer,
  selectIsSubmitting,
  selectIsloading,
  selectCurrentUser,
  selectValidationErrors,
} = authFeature;
