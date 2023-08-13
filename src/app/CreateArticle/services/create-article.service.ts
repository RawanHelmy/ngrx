import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ArticleInterface } from 'src/app/shared/types/article.interface';
import { ArticleRequestInterface } from 'src/app/shared/types/articleRequest.Interface';
import { ArticleResponseInterface } from 'src/app/shared/types/articleResponse.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CreateArticleService {
  constructor(private http: HttpClient) {}

  createArticle(
    article: ArticleRequestInterface
  ): Observable<ArticleInterface> {
    return this.http
      .post<ArticleResponseInterface>(
        `${environment.backendURl}/articles`,
        article
      )
      .pipe(map((res) => res.article));
  }
}
