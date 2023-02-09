import { inject, Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from '@app/features/auth/user/user.service';
import { paths } from '@app/shared/router/paths';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IsAdminGuard implements CanActivate {
  userService = inject(UserService);
  router = inject(Router);

  canActivate(): boolean {
    let isAdmin = false;

    this.userService.user$
      .pipe(
        tap(user => {
          if (user.role === 'admin') {
            isAdmin = true;
          } else {
            this.router.navigate([paths.home]);
          }
        })
      )
      .subscribe();

    return isAdmin;
  }
}
