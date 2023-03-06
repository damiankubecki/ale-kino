import { Component, inject, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { TopbarService } from '@app/topbar.service';
import { UserService } from '@app/features/auth/user/user.service';
import { IUserInfo } from '@app/shared/types/interfaces';
import { IReservedSeat, PurchaseService } from '../purchase.service';
import { map, skip, Subscription, tap } from 'rxjs';
import { Router } from '@angular/router';
import { paths } from '@app/shared/router/paths';
import { DiscountService, IDiscount } from '../discount.service';

type Form = FormGroup<{
  firstname: FormControl<string>;
  lastname: FormControl<string>;
  phone: FormControl<string>;
  email: FormControl<string>;
  emailConfirm: FormControl<string>;
}>;

@Component({
  selector: 'app-buy-ticket-view',
  templateUrl: './confirmation-view.component.html',
  styleUrls: ['./confirmation-view.component.scss'],
})
export class BuyTicketViewComponent {
  private builder = inject(NonNullableFormBuilder);
  private router = inject(Router);
  private userService = inject(UserService);
  private topbarService = inject(TopbarService);
  private purchaseService = inject(PurchaseService);
  private discountService = inject(DiscountService);

  reservedSeats: IReservedSeat[] = [];
  orderPrice = 0;
  userInfo: IUserInfo | null = null;
  form!: Form;
  message = '';
  order$ = this.purchaseService.order$;
  discountCodes: IDiscount[] | null = null;
  discountControl = new FormControl();

  subscription$!: Subscription;

  constructor() {
    this.topbarService.setTopbarContent('Potwierdzenie');

    this.discountService.discountCodes$
      .pipe(tap(codes => (this.discountCodes = codes)))
      .subscribe();

    this.purchaseService.order$
      .pipe(
        map(state => ({
          ...state,
          reservedSeats: state.reservedSeats.sort((a, b) => a.row - b.row),
        }))
      )
      .subscribe(state => {
        this.orderPrice = state.reservedSeats.reduce(
          (acc, current) => acc + current.ticketType.price,
          0
        );
        this.reservedSeats = state.reservedSeats;
      });

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

    if (this.form.controls['email'].value !== this.form.controls['emailConfirm'].value) {
      this.message = 'Podane maile są różne';
      return;
    } else {
      this.purchaseService.setOwner({
        firstname: this.form.controls['firstname'].value,
        lastname: this.form.controls['lastname'].value,
        email: this.form.controls['email'].value,
      });
    }

    this.router.navigate([paths.payment]);
  }

  addDiscount(control: FormControl<string>) {
    const discount = this.discountCodes?.find(discount => discount.name === control.value);

    if (discount) {
      this.purchaseService.addDiscount(discount);
    } else {
      this.discountControl.setErrors({ invalid: true });
    }
  }

  back() {
    window.history.back();
  }

  private createForm(userInfo: IUserInfo | null) {
    const create = this.builder;
    const phoneRegEx = new RegExp('[1-9][0-9]{8}');
    const emailRegEx = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');

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
        validators: [Validators.required, Validators.pattern(emailRegEx)],
      }),
      emailConfirm: create.control(userInfo?.email || '', {
        validators: [Validators.required, Validators.pattern(emailRegEx)],
      }),
    });

    return form;
  }
}
