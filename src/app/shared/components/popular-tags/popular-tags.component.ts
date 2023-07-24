import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { tagActions } from '../../store/actions';
import {
  selectError,
  selectIsLoading,
  selectTags,
} from '../../store/reducers(tags)';
import { combineLatest } from 'rxjs';
import { LoadingComponent } from '../loading/loading.component';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-popular-tags',
  templateUrl: './popular-tags.component.html',
  standalone: true,
  imports: [CommonModule, LoadingComponent, ErrorMessageComponent, RouterLink],
})
export class PopularTagsComponent implements OnInit {
  data$ = combineLatest({
    tags: this.store.select(selectTags),
    loading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
  });

  constructor(private store: Store) {}
  ngOnInit(): void {
    this.store.dispatch(tagActions.getTags());
  }
}
