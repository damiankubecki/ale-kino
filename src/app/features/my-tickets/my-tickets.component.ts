import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { API_URL } from '@app/shared/data/api/api';
import { paths } from '@app/shared/router/paths';
import { TopbarService } from '@app/topbar.service';
import { filter, map, Observable, of, switchMap } from 'rxjs';
import { UserService } from '../auth/user/user.service';
import { IOrder } from '../purchase/purchase.service';

@Component({
  selector: 'app-my-tickets',
  templateUrl: './my-tickets.component.html',
  styleUrls: ['./my-tickets.component.scss'],
})
export class MyTicketsComponent {
  private http = inject(HttpClient);
  private topbarService = inject(TopbarService);
  private userService = inject(UserService);

  paths = paths
  myOrders$!: Observable<IOrder[]>;

  constructor() {
    this.topbarService.setTopbarContent('Moje bilety');

    this.myOrders$ = this.userService.user$.pipe(
      map(user => user.info?.ordersIds),
      filter(Boolean),
      switchMap(ids => {
        const filters = ids?.map((id, index) => (index === 0 ? `?id=${id}` : `&id=${id}`)).join('');

        return ids.length ? this.http.get<IOrder[]>(`${API_URL}/orders${filters}`) : of([]);
      })
    );
  }
}
