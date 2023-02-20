import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { TopbarService } from '@app/topbar.service';
import { UserService } from '@app/features/auth/user/user.service';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { paths } from '@app/shared/router/paths';

type Form = FormGroup<{
  email: FormControl<string>;
  password: FormControl<string>;
}>;

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss'],
})
export class LoginViewComponent {
  private router = inject(Router);
  private builder = inject(NonNullableFormBuilder);
  private userService = inject(UserService);
  private topbarService = inject(TopbarService);

  form = this.createForm();

  constructor() {
    this.topbarService.setTopbarContent('Logowanie');
  }

  handleSubmit() {
    this.form.markAllAsTouched();

    if (this.form.invalid) return;

    const email = this.form.controls['email'].value;
    const password = this.form.controls['password'].value;

    this.userService
      .auth(email, password)
      .pipe(tap(() => this.router.navigate([paths.home])))
      .subscribe();
  }

  private createForm() {
    const create = this.builder;
    const emailRegEx = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');

    const form: Form = create.group({
      email: create.control('', {
        validators: [Validators.required, Validators.pattern(emailRegEx)],
      }),
      password: create.control('', { validators: [Validators.required] }),
    });

    return form;
  }
}
