import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FeedResponseInterface } from '../types/feedResponse.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FeedService {
  constructor(private http: HttpClient) {}

  getFeed(url: string): Observable<FeedResponseInterface> {
    return this.http.get<FeedResponseInterface>(
      `${environment.backendURl}${url}`
    );
  }
}
