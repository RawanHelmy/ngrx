import { ArticleInterface } from 'src/app/shared/types/article.interface';

export interface ArticleStateInterface {
  article: ArticleInterface | null;
  isloading: boolean;
  error: string | null;
}
