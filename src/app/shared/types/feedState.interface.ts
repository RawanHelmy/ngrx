import { FeedResponseInterface } from './feedResponse.interface';

export interface FeedStateInterface {
  isLoading: boolean;
  error: string | null;
  feeds: FeedResponseInterface | null;
}
