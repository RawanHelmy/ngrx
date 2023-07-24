import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PopularTagsResponseInterface } from '../types/popularTagsResponse.interface';

@Injectable({
  providedIn: 'root',
})
export class PopularTagsService {
  constructor(private http: HttpClient) {}

  get(): Observable<string[]> {
    return this.http
      .get<PopularTagsResponseInterface>(`${environment.backendURl}/tags`)
      .pipe(map((res) => res.tags));
  }
}
