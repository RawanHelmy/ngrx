import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, combineLatest, filter, map } from 'rxjs';
import { ArticleFromComponent } from 'src/app/shared/components/article-from/article-from.component';
import { ArticleFormInterface } from 'src/app/shared/components/article-from/types/articleForm.interface';
import {
  selectArticle,
  selectIsLoading,
  selectIsSubmitting,
  selectValidationErrors,
} from '../store/reducers';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';
import { ActivatedRoute } from '@angular/router';
import { ArticleInterface } from 'src/app/shared/types/article.interface';
import { edtiArticleActions } from '../store/actions';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  standalone: true,
  imports: [ArticleFromComponent, CommonModule, LoadingComponent],
})
export class EditArticleComponent implements OnInit {
  slug = this.route.snapshot.paramMap.get('slug') ?? '';
  initialValue$: Observable<ArticleFormInterface> = this.store.pipe(
    select(selectArticle),
    filter((article): article is ArticleInterface => article !== null),
    map((article: ArticleInterface) => {
      return {
        title: article.title,
        body: article.body,
        description: article.description,
        tagList: article.tagList,
      };
    })
  );
  data$ = combineLatest({
    article: this.initialValue$,
    isLoading: this.store.select(selectIsLoading),
    validationErrors: this.store.select(selectValidationErrors),
    isSubmitting: this.store.select(selectIsSubmitting),
  });

  constructor(private store: Store, private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.store.dispatch(edtiArticleActions.getArticle({ slug: this.slug }));
  }
  onSubmit(data: ArticleFormInterface) {
    this.store.dispatch(
      edtiArticleActions.editArticle({
        slug: this.slug,
        request: { article: data },
      })
    );
  }
}
