import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { addToFavoriteActions } from './store/actions';

@Component({
  selector: 'app-add-to-favorite',
  templateUrl: './add-to-favorite.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class AddToFavoriteComponent {
  @Input() isFavorited: boolean = false;
  @Input() slug: string = '';
  @Input() favoritesCount: number = 0;
  constructor(private store: Store) {}
  handleLike() {
    if (this.isFavorited) {
      this.favoritesCount = this.favoritesCount - 1;
    } else {
      this.favoritesCount = this.favoritesCount + 1;
    }
    this.isFavorited = !this.isFavorited;
    this.store.dispatch(
      addToFavoriteActions.addToFavorite({
        isFavorited: this.isFavorited,
        slug: this.slug,
      })
    );
  }
}
