import { inject, Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from '@app/features/auth/user/user.service';
import { paths } from '@app/shared/router/paths';
import { filter, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IsNotAdminGuard implements CanActivate {
  private userService = inject(UserService);
  private router = inject(Router);

  canActivate() {
    return this.checkUserRole();
  }

  private checkUserRole() {
    return this.userService.getMe().pipe(
      filter(Boolean),
      tap(user => {
        if (user.role === 'admin') this.router.navigate([paths.admin]);
      }),
      map(user => user.role !== 'admin')
    );
  }
}
