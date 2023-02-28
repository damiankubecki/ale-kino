import { Component, inject } from '@angular/core';
import { IUser, UserService } from '@app/features/auth/user/user.service';
import { config, IHeaderNavigation } from '@app/config';
import { paths } from '@app/shared/router/paths';
import { icons } from '@app/shared/assets/icons';
import { PurchaseService } from '@app/features/purchase/purchase.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  private userService = inject(UserService);
  private purchaseService = inject(PurchaseService);

  user: IUser = { id: NaN, role: 'guest', info: null };
  menuItems: IHeaderNavigation = config.headerNavigation;
  seatsInBasket = 0;
  paths = paths;
  icons = icons;

  constructor() {
    this.userService.user$.pipe(tap(user => (this.user = user))).subscribe();

    this.purchaseService.order$
      .pipe(tap(order => (this.seatsInBasket = order.reservedSeats.length)))
      .subscribe();
  }
}
