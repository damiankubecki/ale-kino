import { Injectable } from '@angular/core';
import { IUserInfo } from '@myTypes/interfaces';
import { UsersRoles } from '@myTypes/types';
import { BehaviorSubject, filter, map, of } from 'rxjs';

// role Roles = 'admin' | 'user'

// const menus = new Map<Roles, {title: string; path: string}[]>([
//   ['admin', [
//     { title: 'Moje bilety', path: '/' },
//     { title: 'Chcę obejrzeć', path: '/' },
//     { title: 'Ustawienia', path: '/' },
//     { title: 'Wyloguj', path: '/' },
//   ]],
//   ['user', [
//     { title: 'Moje bilety', path: '/' },
//     { title: 'Chcę obejrzeć', path: '/' },
//     { title: 'Ustawienia', path: '/' },
//     { title: 'Wyloguj', path: '/' },
//   ]]
// ]);

// const user$ = of<{role: Roles, id: number}>({
//   role: 'admin',
//   id:3225
// })

// const menuConfig$ = user$.pipe(map(user => menus.get(user.role)));

// <menu *ngIf="menuConfig$ | async as cpmfog"  [config]="config"></menu>

export interface IUser {
  role: UsersRoles;
  info: IUserInfo | null;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user$$ = new BehaviorSubject<IUser>({ role: 'guest', info: null });

  get user$() {
    return this.user$$.asObservable();
  }

  constructor() {
    const newUser: IUser = {
      role: 'user',
      info: {
        firstname: 'Damian',
        lastname: 'Damian',
        email: 'damian@example.com',
        phone: '',
        ordersIds: [],
        wantToWatchIds: [],
        ratedMovies: [],
      },
    };

    this.loginUser(newUser);
  }

  loginUser({ role, info }: IUser) {
    if (role === 'admin') {
      this.user$$.next({ role: 'admin', info: null });
    }

    if (role === 'user') {
      this.user$$.next({ role: 'user', info });
    }
  }

  logoutUser() {
    this.user$$.next({ role: 'guest', info: null });
  }
}
