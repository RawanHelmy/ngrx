import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { articleActions } from '../store/actions';
import { combineLatest, filter, map } from 'rxjs';
import { selectArticle, selectError, selectIsloading } from '../store/reducers';
import { selectCurrentUser } from 'src/app/auth/store/reducers';
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.inteface';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';
import { ErrorMessageComponent } from 'src/app/shared/components/error-message/error-message.component';
import { TagListComponent } from 'src/app/shared/components/tag-list/tag-list.component';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    LoadingComponent,
    ErrorMessageComponent,
    TagListComponent,
  ],
})
export class ArticleComponent implements OnInit {
  slug = this.route.snapshot.paramMap.get('slug') ?? '';

  isAuthor$ = combineLatest({
    article: this.store.select(selectArticle),
    currentUser: this.store
      .select(selectCurrentUser)
      .pipe(
        filter(
          (currentUser): currentUser is CurrentUserInterface | null =>
            currentUser !== undefined
        )
      ),
  }).pipe(
    map(({ article, currentUser }) => {
      if (!article || !currentUser) {
        return false;
      } else {
        return article.author?.username === currentUser.username;
      }
    })
  );
  data$ = combineLatest({
    isloading: this.store.select(selectIsloading),
    article: this.store.select(selectArticle),
    error: this.store.select(selectError),
    isAuthor: this.isAuthor$,
  });
  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.store.dispatch(articleActions.getArticle({ slug: this.slug }));
  }
  deleteArticle() {
    this.store.dispatch(articleActions.deleteArticle({ slug: this.slug }));
  }
}
