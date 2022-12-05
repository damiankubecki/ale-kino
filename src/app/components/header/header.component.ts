import { Component } from '@angular/core';
import { UserService } from '@app/services/user/user.service';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { IUser } from '@myTypes/interfaces';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  faShoppingCart = faShoppingCart;
  user: IUser | null = null;

  constructor(private userService: UserService) {
    this.userService.USER_DATA.subscribe(user => {
      if (user) this.user = user;
    });
  }
}
