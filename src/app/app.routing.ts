import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'register',
    loadChildren: () =>
      import('./auth/auth.routing').then((m) => m.registerRoutes),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./auth/auth.routing').then((m) => m.loginRoutes),
  },
  {
    path: '',
    loadChildren: () =>
      import('./globalFeed/globalFeed.routing').then((m) => m.globalFeedRoutes),
  },
];