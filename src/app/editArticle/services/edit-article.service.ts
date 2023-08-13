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
export class EditArticleService {
  constructor(private http: HttpClient) {}

  editArticle(
    article: ArticleRequestInterface,
    slug: string
  ): Observable<ArticleInterface> {
    return this.http
      .put<ArticleResponseInterface>(
        `${environment.backendURl}/articles/${slug}`,
        article
      )
      .pipe(map((res) => res.article));
  }
}
