import { Component } from '@angular/core';
import { ArticleFromComponent } from 'src/app/shared/components/article-from/article-from.component';
import { ArticleFormInterface } from 'src/app/shared/components/article-from/types/articleForm.interface';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  standalone: true,
  imports: [ArticleFromComponent],
})
export class CreateArticleComponent {
  article: ArticleFormInterface = {
    tagList: [],
    title: '',
    body: '',
    description: '',
  };
  onSubmit(data: any) {
    console.log(data);
  }
}
