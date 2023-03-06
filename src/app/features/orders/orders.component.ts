import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { API_URL } from '@app/shared/data/api/api';
import { paths } from '@app/shared/router/paths';
import { TopbarService } from '@app/topbar.service';
import { catchError, Observable, of, switchMap, tap } from 'rxjs';
import { IOrder } from '../purchase/purchase.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent {
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private topbarService = inject(TopbarService);

  order: IOrder | null = null;
  ticketsPrice = 0;

  constructor() {
    this.topbarService.setTopbarContent('Szczegóły zamówienia');

    this.route.params
      .pipe(
        switchMap(params => {
          const orderId = params['id'];

          return this.http.get<IOrder>(`${API_URL}/orders/${orderId}`);
        }),
        tap(response => {
          this.order = response;
          this.ticketsPrice =
            response.amount ||
            response.reservedSeats.reduce((acc, current) => acc + current.ticketType.price, 0);
        }),
        catchError(() => {
          this.router.navigate([paths.notFound]);

          return of(null);
        })
      )
      .subscribe();
  }
}
