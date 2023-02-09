import { Component, inject, OnInit } from '@angular/core';
import { paths } from '@app/shared/router/paths';
import { TopbarService } from '@app/topbar.service';
import { map, Observable, tap } from 'rxjs';
import { IOrderInProgress, PurchaseService } from '../purchase.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
})
export class BasketComponent {
  private topbarService = inject(TopbarService);
  private purchaseService = inject(PurchaseService);

  order$!: Observable<IOrderInProgress>;
  paths = paths;

  constructor() {
    this.topbarService.setTopbarContent('Koszyk');
    this.order$ = this.purchaseService.order$;
  }

  back() {
    window.history.back();
  }
}
