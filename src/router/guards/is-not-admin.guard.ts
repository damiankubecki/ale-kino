import { inject, Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from '@app/services/user/user.service';
import { paths } from 'router/paths';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IsNotAdminGuard implements CanActivate {
  userService = inject(UserService);
  router = inject(Router);

  canActivate(): boolean {
    let isNotAdmin = false;

    this.userService.user$
      .pipe(
        tap(user => {
          if (user.role !== 'admin') {
            isNotAdmin = true;
          } else {
            this.router.navigate([paths.admin]);
          }
        })
      )
      .subscribe();

    return isNotAdmin;
  }
}
