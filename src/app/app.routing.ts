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
  {
    path: 'feed',
    loadChildren: () =>
      import('./yourFeed/yourFeed.routing').then((m) => m.yourFeedRoutes),
  },
  {
    path: 'articles/new',
    loadChildren: () =>
      import('./CreateArticle/createArticle.routing').then(
        (m) => m.createArticleRoutes
      ),
  },
  {
    path: 'article/:slug',
    loadChildren: () =>
      import('./article/article.routing').then((m) => m.routes),
  },
  {
    path: 'tags/:tagName',
    loadChildren: () =>
      import('./tagFeed/tagFeed.routing').then((m) => m.tagFeedRoutes),
  },
];
