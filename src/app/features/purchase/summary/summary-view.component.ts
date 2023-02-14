import { Component, inject, OnDestroy } from '@angular/core';
import { paths } from '@app/shared/router/paths';
import { TopbarService } from '@app/topbar.service';
import { IOrderInProgress, PurchaseService } from '../purchase.service';
import { filter, of, Subscription, switchMap, tap } from 'rxjs';
import { RepertoireService } from '@app/shared/data/repertoire/repertoire.service';
import { Router } from '@angular/router';
import { UserService } from '@app/features/auth/user/user.service';

@Component({
  selector: 'app-summary-view',
  templateUrl: './summary-view.component.html',
  styleUrls: ['./summary-view.component.scss'],
})
export class SummaryViewComponent implements OnDestroy {
  private router = inject(Router);
  private topbarService = inject(TopbarService);
  private purchaseService = inject(PurchaseService);
  private repertoireService = inject(RepertoireService);
  private userService = inject(UserService);

  private subscription$: Subscription;

  orderEmail: string = '';
  paths = paths;
  order!: IOrderInProgress;

  constructor() {
    this.topbarService.setTopbarContent('Podsumowanie');

    this.subscription$ = this.purchaseService.order$.subscribe(order => {
      if (order.owner) {
        this.orderEmail = order.owner.email;
      }

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
                          [order.showing.hour]: [...item[order.showing?.hour], ...seatsInOrderIds],
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

        this.purchaseService
          .sendOrder()
          .pipe(
            switchMap(order => {
              return this.userService.assignOrderToUser(order.id) || of(null);
            }),
            switchMap(() => {
              return this.repertoireService.updateShowings(movieId, updatedShowings);
            }),
            tap(() => {
              this.purchaseService.clearOrder();
              window.location.reload()
            })
          )
          .subscribe();
      }
    });
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }
}
