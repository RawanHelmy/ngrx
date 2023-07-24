import { HttpInterceptorFn } from '@angular/common/http';
import { PersistanceService } from './persistance.service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const persistanceService = inject(PersistanceService);
  const token = persistanceService.get('token');
  request = request.clone({
    setHeaders: {
      Authorization: token ? `Token ${token}` : '',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
  return next(request);
};
