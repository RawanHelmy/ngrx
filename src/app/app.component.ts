import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopbarComponent } from './shared/components/topbar/topbar.component';
import { Store } from '@ngrx/store';
import { authActions } from './auth/store/actions';
import { PopularTagsComponent } from './shared/components/popular-tags/popular-tags.component';
import { BannerComponent } from './shared/components/banner/banner.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    RouterOutlet,
    TopbarComponent,
    BannerComponent,
    PopularTagsComponent,
  ],
})
export class AppComponent {
  constructor(private store: Store) {
    this.store.dispatch(authActions.getUser());
  }
}
