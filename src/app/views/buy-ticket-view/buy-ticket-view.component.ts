import { Component } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { UserService } from '@app/services/user/user.service';
import { IUser, IUserInfo } from '@myTypes/interfaces';

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
  userInfo: IUserInfo | null = null;
  form!: Form;
  message = '';

  handleSubmit() {
    this.form.markAllAsTouched();
    console.log(this.form.controls.phone.errors);
    if (this.form.invalid) return;

    if (this.form.controls['email'].value !== this.form.controls['emailRepeat'].value) {
      this.message = 'Podane maile są różne';
    }
    console.log(this.form.value);
  }

  constructor(private builder: NonNullableFormBuilder, private userService: UserService) {
    this.userService.USER_DATA.subscribe({
      next: user => {
        if (user?.type === 'user' && user?.info) {
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

  private createForm(userInfo: IUserInfo | null) {
    const create = this.builder;

    const form: Form = create.group({
      firstname: create.control(userInfo?.firstname || '', {
        validators: [Validators.required, Validators.minLength(3), Validators.maxLength(99)],
      }),
      lastname: create.control(userInfo?.lastname || '', {
        validators: [Validators.required, Validators.minLength(3), Validators.maxLength(99)],
      }),
      phone: create.control(userInfo?.phone || '', {
        validators: [Validators.minLength(9), Validators.maxLength(9)],
      }),
      email: create.control(userInfo?.email || '', {
        validators: [Validators.required],
      }),
      emailRepeat: create.control(userInfo?.email || '', { validators: [Validators.required] }),
    });

    return form;
  }
}
