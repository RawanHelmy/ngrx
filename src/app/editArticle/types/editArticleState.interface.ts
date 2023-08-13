import { ArticleInterface } from 'src/app/shared/types/article.interface';
import { BackendErrorsInterface } from 'src/app/shared/types/backendErrors.interface';

export interface EditArticleStateInterface {
  isSubmitting: boolean;
  isLoading: boolean;
  validationErrors: BackendErrorsInterface | null;
  article: ArticleInterface | null;
}
