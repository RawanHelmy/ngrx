import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { feedActions } from '../../store/actions';
import { combineLatest } from 'rxjs';
import {
  selectError,
  selectFeeds,
  selectIsLoading,
} from '../../store/reducers';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { LoadingComponent } from '../loading/loading.component';
import { PaginationComponent } from '../pagination/pagination.component';
import queryString from 'query-string';
import { TagListComponent } from '../tag-list/tag-list.component';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ErrorMessageComponent,
    LoadingComponent,
    PaginationComponent,
    TagListComponent,
  ],
})
export class FeedComponent implements OnInit, OnChanges {
  baseUrl = this.router.url.split('?')[0];
  currentPage = 1;
  @Input() url = '';
  store$ = combineLatest({
    feed: this.store.select(selectFeeds),
    error: this.store.select(selectError),
    isLoading: this.store.select(selectIsLoading),
  });
  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    const isUrlChanged =
      !changes['url'].firstChange &&
      changes['url'].currentValue !== changes['url'].previousValue;
    if (isUrlChanged) {
      this.getFeed();
    }
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.currentPage = Number(params['page'] || '1');
      this.getFeed();
    });
  }
  getFeed() {
    let offset = this.currentPage * 20 - 20;
    const parsedUrl = queryString.parseUrl(this.url);
    const parameter = queryString.stringify({
      limit: 20,
      offset,
      ...parsedUrl.query,
    });
    this.store.dispatch(
      feedActions.getFeed({ url: `${parsedUrl.url}?${parameter}` })
    );
  }
}
