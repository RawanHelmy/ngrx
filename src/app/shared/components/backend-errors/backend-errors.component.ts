import { Component, Input, OnInit } from '@angular/core';
import { BackendErrorsInterface } from '../../types/backendErrors.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-backend-errors',
  templateUrl: './backend-errors.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class BackendErrorsComponent implements OnInit {
  @Input() errors: BackendErrorsInterface = {};
  messages: string[] = [];

  ngOnInit(): void {
    this.messages = Object.keys(this.errors).map((name: string) => {
      console.log(this.errors[name]);
      let m = this.errors[name].join(' ');
      return `${name} ${m}`;
    });
  }
}
