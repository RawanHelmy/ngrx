import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ArticleInterface } from '../types/article.interface';
import { environment } from 'src/environments/environment';
import { ArticleResponseInterface } from '../types/articleResponse.interface';

@Injectable({
  providedIn: 'root',
})
export class AddTofavoritesService {
  constructor(private http: HttpClient) {}

  addToFavorite(slug: string): Observable<ArticleInterface> {
    return this.http
      .post<ArticleResponseInterface>(
        `${environment.backendURl}/articles/${slug}/favorite`,
        {}
      )
      .pipe(
        map((res) => {
          return res.article;
        })
      );
  }
  removeFromFavorite(slug: string): Observable<ArticleInterface> {
    return this.http
      .delete<ArticleResponseInterface>(
        `${environment.backendURl}/articles/${slug}/favorite`
      )
      .pipe(
        map((res) => {
          return res.article;
        })
      );
  }
}
