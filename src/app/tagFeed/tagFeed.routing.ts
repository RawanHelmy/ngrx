import { Route } from '@angular/router';
import { tagFeedComponent } from './components/global-feed/tag-feed.component';

export const tagFeedRoutes: Route[] = [
  {
    path: '',
    component: tagFeedComponent,
  },
];
