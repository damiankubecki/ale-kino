import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '@app/features/auth/user/user.service';
import { paths } from '@app/shared/router/paths';

@Component({
  selector: 'app-logout-view',
  templateUrl: './logout-view.component.html',
  styleUrls: ['./logout-view.component.scss'],
})
export class LogoutViewComponent {
  private router = inject(Router);
  private userService = inject(UserService);

  handleClick() {
    this.router.navigate([paths.home]);
  }

  logout() {
    this.userService.logout();
  }
}
