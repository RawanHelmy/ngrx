import { Route } from '@angular/router';
import { CreateArticleComponent } from './create-article/create-article.component';

export const createArticleRoutes: Route[] = [
  {
    path: '',
    component: CreateArticleComponent,
  },
];
