import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { feedActions } from '../../store/actions';
import { combineLatest } from 'rxjs';
import {
  selectError,
  selectFeeds,
  selectIsLoading,
} from '../../store/reducers';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  standalone: true,
  imports: [CommonModule, RouterLink],
})
export class FeedComponent implements OnInit {
  @Input() url = '';
  store$ = combineLatest({
    feed: this.store.select(selectFeeds),
    error: this.store.select(selectError),
    isLoading: this.store.select(selectIsLoading),
  });
  constructor(private store: Store) {}
  ngOnInit(): void {
    this.store.dispatch(feedActions.getFeed({ url: this.url }));
  }
}
