import { BackendErrorsInterface } from 'src/app/shared/types/backendErrors.interface';

export interface ArticleStateInterface {
  isSubmitting: boolean;
  validationErrors: BackendErrorsInterface | null;
}
