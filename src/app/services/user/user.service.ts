import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IUserInfo } from '@myTypes/interfaces';
import { UsersRoles } from '@myTypes/types';
import { API_URL } from 'api';
import { BehaviorSubject } from 'rxjs';

export interface IUser {
  role: UsersRoles;
  info: IUserInfo | null;
}

interface ApiResponse {
  accesToken: string;
  user: {
    email: string;
    id: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);

  private user$$ = new BehaviorSubject<IUser>({ role: 'guest', info: null });

  get user$() {
    return this.user$$.asObservable();
  }

  constructor() {
    const loggedUserId = window.localStorage.getItem('userID');

    if (loggedUserId) {
      this.getUser(loggedUserId);
    }
  }

  auth(email: string, password: string) {
    this.http.post<ApiResponse>(`${API_URL}/login`, { email, password }).subscribe({
      next: response => {
        const { id } = response.user;

        window.localStorage.setItem('userID', id.toString());
        this.getUser(id);
      },
    });
  }

  logout() {
    window.localStorage.removeItem('userID');
    this.user$$.next({ role: 'guest', info: null });
  }

  private getUser(id: string) {
    this.http.get<IUser[]>(`${API_URL}/user?id=${id}`).subscribe({
      next: ([user]) => {
        const { role, info } = user;

        if (role === 'admin') {
          this.user$$.next({ role: 'admin', info: null });
        }

        if (role === 'user') {
          this.user$$.next({ role: 'user', info });
        }
      },
    });
  }
}
