import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app/app.routing';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { isDevMode } from '@angular/core';
import { authFeatureKey, authReducer } from './app/auth/store/reducers';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import * as authEffects from './app/auth/store/effects';
import * as feedEffects from './app/shared/store/effects';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { authInterceptor } from './app/shared/services/auth.interceptor.service';
import { feedFeatureKey, feedReducer } from './app/shared/store/reducers';
import { tagFeatureKey, tagReducer } from './app/shared/store/reducers(tags)';
import * as tagsEffects from './app/shared/store/effects(tags)';
import * as articleEffects from './app/article/store/effects';
import * as createArticleEffects from './app/createArticle/store/effects';
import * as editArticleEffects from './app/editArticle/store/effects';
import * as addToFavoriteEffects from './app/shared/components/add-to-favorite/store/effects';
import {
  createArticleFeatureKey,
  createArticleReducer,
} from './app/createArticle/store/reducers';
import {
  articleFeatureKey,
  articleReducer,
} from './app/article/store/reducers';
import {
  editArticleFeatureKey,
  editArticleReducer,
} from './app/editArticle/store/reducers';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes),
    provideStore({
      router: routerReducer,
    }),
    provideStoreDevtools({
      maxAge: 30,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 100,
    }),
    provideState(authFeatureKey, authReducer),
    provideState(feedFeatureKey, feedReducer),
    provideState(tagFeatureKey, tagReducer),
    provideState(createArticleFeatureKey, createArticleReducer),
    provideState(articleFeatureKey, articleReducer),
    provideState(editArticleFeatureKey, editArticleReducer),

    provideHttpClient(withInterceptors([authInterceptor])),
    provideEffects(
      authEffects,
      feedEffects,
      tagsEffects,
      createArticleEffects,
      articleEffects,
      editArticleEffects,
      addToFavoriteEffects
    ),
    provideRouterStore(),
  ],
});
