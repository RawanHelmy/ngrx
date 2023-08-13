import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ArticleFormInterface } from './types/articleForm.interface';
import { BackendErrorsInterface } from '../../types/backendErrors.interface';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BackendErrorsComponent } from '../backend-errors/backend-errors.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-article-from',
  templateUrl: './article-from.component.html',
  standalone: true,
  imports: [
    BackendErrorsComponent,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
})
export class ArticleFromComponent implements OnInit {
  @Input() initialValues?: ArticleFormInterface;
  @Input() isSubmitting: boolean = false;
  @Input() errors: BackendErrorsInterface | null = null;

  form = this.fb.nonNullable.group({
    title: '',
    description: '',
    body: '',
    tagList: '',
  });
  @Output() articleSubmit = new EventEmitter<ArticleFormInterface>();

  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.setFormValues();
  }
  setFormValues() {
    if (this.initialValues) {
      this.form.patchValue({
        title: this.initialValues.title,
        description: this.initialValues.description,
        body: this.initialValues.body,
        tagList: this.initialValues.tagList.join(' '),
      });
    }
  }
  onSubmit() {
    this.articleSubmit.emit({
      ...this.form.getRawValue(),
      tagList: this.form.getRawValue().tagList.split(' '),
    });
  }
}
