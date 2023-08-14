import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Subscription, combineLatest, filter } from 'rxjs';
import { selectIsSubmitting, selectValidationErrors } from '../store/reducers';
import { selectCurrentUser } from 'src/app/auth/store/reducers';
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.inteface';
import { CommonModule } from '@angular/common';
import { BackendErrorsComponent } from 'src/app/shared/components/backend-errors/backend-errors.component';
import { authActions } from 'src/app/auth/store/actions';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BackendErrorsComponent,
  ],
})
export class SettingsComponent implements OnInit, OnDestroy {
  form = this.fb.nonNullable.group({
    image: '',
    username: '',
    bio: '',
    email: '',
    password: '',
  });
  sub?: Subscription;
  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    validationErrorrs: this.store.select(selectValidationErrors),
  });
  currentUser?: CurrentUserInterface;
  constructor(private fb: FormBuilder, private store: Store) {}
  ngOnInit(): void {
    this.sub = this.store
      .pipe(select(selectCurrentUser), filter(Boolean))
      .subscribe((res: CurrentUserInterface) => {
        this.currentUser = res;
        this.initForm(res);
      });
  }
  initForm(user: CurrentUserInterface) {
    if (user)
      this.form.patchValue({
        image: user.image ?? '',
        username: user.username,
        bio: user.bio ?? '',
        email: user.email,
        password: '',
      });
  }
  submit() {
    if (this.currentUser) {
      this.store.dispatch(
        authActions.updateUser({
          user: {
            user: {
              ...this.currentUser,
              ...this.form.getRawValue(),
            },
          },
        })
      );
    }
  }
  logout() {
    this.store.dispatch(authActions.logout());
  }
  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
