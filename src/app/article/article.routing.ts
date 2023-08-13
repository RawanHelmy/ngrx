import { Route } from '@angular/router';
import { ArticleComponent } from './article/article.component';
import { provideState } from '@ngrx/store';
import { articleFeatureKey, articleReducer } from './store/reducers';
import * as articleEffects from './store/effects';
import { provideEffects } from '@ngrx/effects';
export const routes: Route[] = [
  {
    path: '',
    component: ArticleComponent,
    // providers: [
    //   provideState(articleFeatureKey, articleReducer),
    //   provideEffects(articleEffects),
    // ],
  },
];
