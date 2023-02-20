import { inject, Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { IUser, UserService } from '@app/features/auth/user/user.service';
import { paths } from '@app/shared/router/paths';
import { debounceTime, filter, map, skip, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IsGuestGuard implements CanActivate {
  userService = inject(UserService);
  router = inject(Router);

  canActivate() {
    return this.checkUserRole();
  }

  checkUserRole() {
    return this.userService.getMe().pipe(
      filter(Boolean),
      tap(user => {
        if (user.role !== 'guest') this.router.navigate([paths.home]);
      }),
      map(user => user.role === 'guest')
    );
  }
}
