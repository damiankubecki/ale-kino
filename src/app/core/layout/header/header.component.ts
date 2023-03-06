import { Component, inject } from '@angular/core';
import { UserService } from '@app/features/auth/user/user.service';
import { config, IHeaderNavigation } from '@app/config';
import { paths } from '@app/shared/router/paths';
import { icons } from '@app/shared/assets/icons';
import { PurchaseService } from '@app/features/purchase/purchase.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  private userService = inject(UserService);
  private purchaseService = inject(PurchaseService);

  user$ = this.userService.user$;
  seatsInBasket$ = this.purchaseService.order$.pipe(map(order => order.reservedSeats.length));
  menuItems: IHeaderNavigation = config.headerNavigation;
  paths = paths;
  icons = icons;
}
