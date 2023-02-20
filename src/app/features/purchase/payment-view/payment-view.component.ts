import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '@app/features/auth/user/user.service';
import { RepertoireService } from '@app/shared/data/repertoire/repertoire.service';
import { paths } from '@app/shared/router/paths';
import { TopbarService } from '@app/topbar.service';
import { combineLatest, map, of, Subscription, switchMap, tap } from 'rxjs';
import { PurchaseService } from '../purchase.service';

type Form = FormGroup<{
  blikCode: FormControl<string>;
}>;

@Component({
  selector: 'app-payment-view',
  templateUrl: './payment-view.component.html',
  styleUrls: ['./payment-view.component.scss'],
})
export class PaymentViewComponent implements OnDestroy {
  private builder = inject(NonNullableFormBuilder);
  private router = inject(Router);
  private topbarService = inject(TopbarService);
  private purchaseService = inject(PurchaseService);
  private repertoireService = inject(RepertoireService);
  private userService = inject(UserService);

  private subscription$!: Subscription;
  private orderSubscription$!: Subscription;

  form!: Form;

  constructor() {
    this.topbarService.setTopbarContent('Płatność');

    this.form = this.createForm();

    this.orderSubscription$ = this.purchaseService.order$
      .pipe(
        tap(order => {
          if (!order.reservedSeats.length) {
            this.router.navigate([paths.home]);
          }
        })
      )
      .subscribe();
  }

  handleSubmit() {
    this.form.markAllAsTouched();

    if (this.form.invalid) return;

    this.subscription$ = this.sendOrder()
      .pipe(
        tap(response => {
          this.router.navigate([paths.summary, response?.id]).then(() => {
            window.location.reload();
            this.purchaseService.clearOrder();
          });
        })
      )
      .subscribe();
  }

  back() {
    window.history.back();
  }

  ngOnDestroy() {
    if (this.subscription$) this.subscription$.unsubscribe();
    this.orderSubscription$.unsubscribe();
  }

  private sendOrder() {
    return this.purchaseService.order$.pipe(
      switchMap(order => {
        if (order.movie && order.showing) {
          const seatsInOrderIds = order.reservedSeats.map(seat => seat.seatId);

          const updatedShowings = this.repertoireService.repertoire
            .filter(item => item.id === order.movie?.id)
            .map(item => item.showings)
            .map(item => {
              return item.map(showing => {
                const dayToUpdate = showing.day === order.showing?.day;
                if (dayToUpdate) {
                  return {
                    ...showing,
                    occupiedSeatsIds: showing.occupiedSeatsIds.map(item => {
                      if (!order.showing?.hour) return item;
                      return item[order.showing?.hour]
                        ? {
                            [order.showing.hour]: [
                              ...item[order.showing?.hour],
                              ...seatsInOrderIds,
                            ],
                          }
                        : item;
                    }),
                  };
                } else {
                  return showing;
                }
              });
            })
            .flat();

          const movieId = order.movie.id;

          return this.purchaseService.sendOrder().pipe(
            switchMap(order => {
              return combineLatest([
                this.userService.assignOrderToUser(order.id) || of(null),
                of(order),
              ]);
            }),
            switchMap(([result, order]) => {
              return combineLatest([
                this.repertoireService.updateShowings(movieId, updatedShowings),
                of(order),
              ]);
            }),
            map(([result, order]) => order)
          );
        } else return of(null);
      })
    );
  }

  private createForm() {
    const create = this.builder;

    const form = create.group({
      blikCode: create.control('', {
        validators: [Validators.required, Validators.minLength(6), Validators.maxLength(6)],
      }),
    });

    return form;
  }
}
