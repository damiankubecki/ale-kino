import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IUserInfo } from '@app/shared/types/interfaces';
import { UsersRoles } from '@app/shared/types/types';
import { API_URL, GET_ME_ENDPOINT } from '@app/shared/data/api/api';
import { BehaviorSubject } from 'rxjs';
import { getCookie, setCookie, removeCookie } from 'typescript-cookie';

export interface IUser {
  role: UsersRoles;
  info?: IUserInfo | null;
}

interface ApiGetMeResponse {
  id: string;
  email: string;
  data: IUser;
}

interface ApiAuthResponse {
  accessToken: string;
  user: ApiGetMeResponse;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);

  private user$$ = new BehaviorSubject<IUser>({ role: 'guest' });

  get user$() {
    return this.user$$.asObservable();
  }

  constructor() {
    const accesToken = getCookie('token');

    if (accesToken) {
      this.getMe(accesToken);
    }
  }

  auth(email: string, password: string) {
    this.http.post<ApiAuthResponse>(`${API_URL}/login`, { email, password }).subscribe({
      next: response => {
        const { accessToken } = response;

        setCookie('token', accessToken);

        this.getMe(accessToken);
      },
    });
  }

  logout() {
    removeCookie('token');

    this.setUser({ role: 'guest' });
  }

  private getMe(accessToken: string) {
    this.http
      .get<ApiGetMeResponse>(`${API_URL}/${GET_ME_ENDPOINT}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .subscribe({
        next: user => {
          this.setUser(user.data);
        },
      });
  }

  private setUser({ role, info }: IUser) {
    if (role === 'admin') {
      this.user$$.next({ role, info: null });
    } else if (role === 'user') {
      this.user$$.next({ role, info });
    } else {
      this.user$$.next({ role: 'guest', info: null });
    }
  }
}
