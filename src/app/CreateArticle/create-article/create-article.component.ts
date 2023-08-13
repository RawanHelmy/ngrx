import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { ArticleFromComponent } from 'src/app/shared/components/article-from/article-from.component';
import { ArticleFormInterface } from 'src/app/shared/components/article-from/types/articleForm.interface';
import { selectIsSubmitting, selectValidationErrors } from '../store/reducers';
import { createArticleActions } from '../store/actions';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  standalone: true,
  imports: [ArticleFromComponent, CommonModule],
})
export class CreateArticleComponent {
  article: ArticleFormInterface = {
    tagList: [],
    title: '',
    body: '',
    description: '',
  };
  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    validationErrors: this.store.select(selectValidationErrors),
  });

  constructor(private store: Store) {}
  onSubmit(data: ArticleFormInterface) {
    this.store.dispatch(
      createArticleActions.createArticle({ request: { article: data } })
    );
  }
}
