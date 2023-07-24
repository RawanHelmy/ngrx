import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { FeedResponseInterface } from '../types/feedResponse.interface';

export const feedActions = createActionGroup({
  source: 'feed',
  events: {
    'get feed': props<{ url: string }>(),
    'get feed success': props<{ feed: FeedResponseInterface }>(),
    'get feed failure': emptyProps(),
  },
});
export const tagActions = createActionGroup({
  source: 'tag',
  events: {
    'get tags': emptyProps(),
    'get tags success': props<{ tags: string[] }>(),
    'get tags failure': emptyProps(),
  },
});
