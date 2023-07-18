import { ArticleInterface } from './article.interface';

export interface FeedResponseInterface {
  articles: ArticleInterface[];
  articlesCount: number;
}
