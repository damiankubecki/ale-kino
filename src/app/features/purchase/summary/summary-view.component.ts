import { Component, inject, OnDestroy } from '@angular/core';
import { paths } from '@app/shared/router/paths';
import { TopbarService } from '@app/topbar.service';
import { IOrder, PurchaseService } from '../purchase.service';
import { map, switchMap, tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '@app/shared/data/api/api';

@Component({
  selector: 'app-summary-view',
  templateUrl: './summary-view.component.html',
  styleUrls: ['./summary-view.component.scss'],
})
export class SummaryViewComponent {
  private http = inject(HttpClient);
  private activatedRoute = inject(ActivatedRoute);
  private topbarService = inject(TopbarService);
  private purchaseService = inject(PurchaseService);

  paths = paths;
  ownerEmail = '';
  orderId = NaN;

  constructor() {
    this.topbarService.setTopbarContent('Podsumowanie');

    this.activatedRoute.params
      .pipe(
        map(params => params['id']),
        switchMap(id => {
          return this.http.get<IOrder>(`${API_URL}/orders/${id}`);
        }),
        tap(order => {
          this.orderId = order.id;
          this.ownerEmail = order.owner.email;
        })
      )
      .subscribe();
  }
}
