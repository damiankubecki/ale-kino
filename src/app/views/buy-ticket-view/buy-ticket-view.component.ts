import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { TopbarService } from '@app/services/topbar/topbar.service';
import { UserService } from '@app/services/user/user.service';
import { IUserInfo } from '@myTypes/interfaces';

type Form = FormGroup<{
  firstname: FormControl<string>;
  lastname: FormControl<string>;
  phone: FormControl<string>;
  email: FormControl<string>;
  emailRepeat: FormControl<string>;
}>;

@Component({
  selector: 'app-buy-ticket-view',
  templateUrl: './buy-ticket-view.component.html',
  styleUrls: ['./buy-ticket-view.component.scss'],
})
export class BuyTicketViewComponent {
  private builder = inject(NonNullableFormBuilder);
  private userService = inject(UserService);
  private topbarService = inject(TopbarService);

  userInfo: IUserInfo | null = null;
  form!: Form;
  message = '';

  constructor() {
    this.topbarService.setTopbarContent('Apokawixa, 12/12/2022, 14:30');

    this.userService.user$.subscribe({
      next: user => {
        if (user.role === 'user' && user?.info) {
          this.userInfo = user.info;
        }

        this.form = this.createForm(this.userInfo || null);
      },
    });

    this.form.valueChanges.subscribe({
      next: () => {
        this.message = '';
      },
    });
  }

  handleSubmit() {
    this.form.markAllAsTouched();

    if (this.form.invalid) return;

    if (this.form.controls['email'].value !== this.form.controls['emailRepeat'].value) {
      this.message = 'Podane maile są różne';
    } else this.message = '<- nie. wszystko ok';
  }

  private createForm(userInfo: IUserInfo | null) {
    const create = this.builder;
    const phoneRegEx = new RegExp('[1-9][0-9]{8}');

    const form: Form = create.group({
      firstname: create.control(userInfo?.firstname || '', {
        validators: [Validators.required, Validators.minLength(3), Validators.maxLength(99)],
      }),
      lastname: create.control(userInfo?.lastname || '', {
        validators: [Validators.required, Validators.minLength(3), Validators.maxLength(99)],
      }),
      phone: create.control(userInfo?.phone || '', {
        validators: [
          Validators.minLength(9),
          Validators.maxLength(9),
          Validators.pattern(phoneRegEx),
        ],
      }),
      email: create.control(userInfo?.email || '', {
        validators: [Validators.required],
      }),
      emailRepeat: create.control(userInfo?.email || '', { validators: [Validators.required] }),
    });

    return form;
  }
}
