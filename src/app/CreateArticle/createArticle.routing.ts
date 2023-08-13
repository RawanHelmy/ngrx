import { Route } from '@angular/router';
import { CreateArticleComponent } from './create-article/create-article.component';
import * as CreateArticleEffect from './store/effects';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import {
  createArticleFeatureKey,
  createArticleReducer,
} from './store/reducers';

export const createArticleRoutes: Route[] = [
  {
    path: '',
    component: CreateArticleComponent,
    // providers: [
    //   provideEffects(CreateArticleEffect),
    //   provideState(createArticleFeatureKey, createArticleReducer),
    // ],
  },
];
