import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ArticleInterface } from '../types/article.interface';
import { ArticleResponseInterface } from '../types/articleResponse.interface';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  constructor(private http: HttpClient) {}

  getArticle(slug: string): Observable<ArticleInterface> {
    return this.http
      .get<ArticleResponseInterface>(
        `${environment.backendURl}/articles/${slug}`
      )
      .pipe(map((res) => res.article));
  }
}
