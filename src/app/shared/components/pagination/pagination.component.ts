import { Component, Input, OnInit } from '@angular/core';
import { UtilitiesService } from '../../services/utilities.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  standalone: true,
  imports: [CommonModule, RouterLink],
})
export class PaginationComponent implements OnInit {
  @Input() limit: number = 20;
  @Input() total: number = 0;
  @Input() url: string = '';
  @Input() currentPage: number = 1;
  pageCount: number = 1;
  pages: number[] = [];

  constructor(private utilsSerivce: UtilitiesService) {}
  ngOnInit(): void {
    this.pageCount = Math.ceil(this.total / this.limit);
    this.pages =
      this.pageCount > 0 ? this.utilsSerivce.range(1, this.pageCount) : [];
  }
}
