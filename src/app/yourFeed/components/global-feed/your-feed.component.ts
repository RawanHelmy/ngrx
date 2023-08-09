import { Component } from '@angular/core';
import { FeedTogglerComponent } from 'src/app/shared/components/feed-toggler/feed-toggler.component';
import { FeedComponent } from 'src/app/shared/components/feed/feed.component';

@Component({
  selector: 'app-your-feed',
  templateUrl: './your-feed.component.html',
  standalone: true,
  imports: [FeedComponent, FeedTogglerComponent],
})
export class YourFeedComponent {
  url = '/articles/feed';
}
