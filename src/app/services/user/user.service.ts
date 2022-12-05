import { Injectable } from '@angular/core';
import { IUser } from '@myTypes/interfaces';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _USER_DATA = new BehaviorSubject<IUser | null>(null);

  constructor() {
    const newUser: IUser = {
      type: 'user',
      info: {
        firstname: 'Damian',
        lastname: '',
        email: 'd',
        phone: 123456789,
        ordersIds: [],
        wantToWatchIds: [],
        ratedMovies: [],
      },
    };

    this.setUser(newUser);
  }

  public setUser(userData?: IUser) {
    if (userData) {
      this._USER_DATA.next(userData);
    } else this.USER_DATA.next(null);
  }

  public get USER_DATA() {
    return this._USER_DATA;
  }
}
