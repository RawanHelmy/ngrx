import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { RegisterRequestInterface } from '../types/register.interface';
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.inteface';
import { BackendErrorsInterface } from 'src/app/shared/types/backendErrors.interface';
import { LoginRequestInterface } from '../types/login.interface';

export const authActions = createActionGroup({
  source: 'auth',
  events: {
    Register: props<RegisterRequestInterface>(),
    'register success': props<{ user: CurrentUserInterface }>(),
    'register failure': props<{ errors: BackendErrorsInterface }>(),

    Login: props<LoginRequestInterface>(),
    'login success': props<{ user: CurrentUserInterface }>(),
    'login failure': props<{ errors: BackendErrorsInterface }>(),

    'get user': emptyProps(),
    'get user success': props<{ user: CurrentUserInterface }>(),
    'get user failure': emptyProps(),
  },
});
