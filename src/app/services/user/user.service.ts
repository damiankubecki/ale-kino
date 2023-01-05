import { Injectable } from '@angular/core';
import { IUserInfo } from '@myTypes/interfaces';
import { UsersRoles } from '@myTypes/types';
import { BehaviorSubject } from 'rxjs';

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
