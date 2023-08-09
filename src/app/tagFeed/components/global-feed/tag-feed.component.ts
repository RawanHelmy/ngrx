import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BannerComponent } from 'src/app/shared/components/banner/banner.component';
import { FeedTogglerComponent } from 'src/app/shared/components/feed-toggler/feed-toggler.component';
import { FeedComponent } from 'src/app/shared/components/feed/feed.component';
import { PopularTagsComponent } from 'src/app/shared/components/popular-tags/popular-tags.component';

@Component({
  selector: 'app-tag-feed',
  templateUrl: './tag-feed.component.html',
  standalone: true,
  imports: [
    FeedComponent,
    BannerComponent,
    PopularTagsComponent,
    FeedTogglerComponent,
  ],
})
export class tagFeedComponent implements OnInit {
  tagUrl = '';
  tagName?: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((res: any) => {
      this.tagUrl = `/articles?tag=${res.tagName}`;
      this.tagName = res.tagName;
    });
  }
}
