import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IMovieRate, IUserInfo } from '@app/shared/types/interfaces';
import { UsersRoles } from '@app/shared/types/types';
import { API_URL, GET_ME_ENDPOINT } from '@app/shared/data/api/api';
import { BehaviorSubject, catchError, map, of, switchMap, tap } from 'rxjs';
import { getCookie, setCookie, removeCookie } from 'typescript-cookie';

export interface IUser {
  id: number;
  role: UsersRoles;
  info?: IUserInfo | null;
}

interface ApiGetMeResponse {
  id: number;
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

  private user$$ = new BehaviorSubject<IUser>({ id: NaN, role: 'guest' });

  get user$() {
    return this.user$$.asObservable();
  }

  constructor() {
    this.getMe().subscribe();
  }

  assignOrderToUser(orderId: number) {
    const { id, role, info } = this.user$$.value;
    if (!id || !role || !info) return;

    return this.http
      .patch<IUser>(`${API_URL}/users/${id}`, {
        data: { role, info: { ...info, ordersIds: [...info.ordersIds, orderId] } },
      })
      .pipe(tap(() => this.getMe().subscribe()));
  }

  addMovieRate(movieId: number, rate: number) {
    const { id, role, info } = this.user$$.value;
    if (!id || !role || !info) return;

    const isMovieRated = this.user$$.value.info?.ratedMovies.filter(
      rate => rate.movieId === movieId
    ).length;

    if (isMovieRated) {
      return this.http.get<IMovieRate[]>(`${API_URL}/rates?userId=${id}&movieId=${movieId}`).pipe(
        switchMap(([response]) => {
          return this.http.patch<IMovieRate>(`${API_URL}/rates/${response.id}`, {
            rate,
          });
        }),
        switchMap(() => {
          return this.http.patch<IUser>(`${API_URL}/users/${id}`, {
            data: {
              role,
              info: {
                ...info,
                ratedMovies: info?.ratedMovies.map(item =>
                  item.movieId === movieId ? { ...item, rate } : item
                ),
              },
            },
          });
        }),
        tap(() => this.getMe().subscribe())
      );
    } else {
      return this.http
        .post<IMovieRate>(`${API_URL}/rates`, { userId: this.user$$.value.id, movieId, rate })
        .pipe(
          switchMap(response => {
            return this.http.patch<IUser>(`${API_URL}/users/${id}`, {
              data: {
                role,
                info: {
                  ...info,
                  ratedMovies: [
                    ...info.ratedMovies,
                    { rate: response.rate, movieId: response.movieId },
                  ],
                },
              },
            });
          }),
          tap(() => this.getMe().subscribe())
        );
    }
  }

  addMovieToWatchlist(movieId: number) {
    const { id, role, info } = this.user$$.value;
    if (!id || !role || !info) return;

    return this.http
      .patch<IUser>(`${API_URL}/users/${id}`, {
        data: { role, info: { ...info, wantToWatchIds: [...info.wantToWatchIds, movieId] } },
      })
      .pipe(tap(() => this.getMe().subscribe()));
  }

  removeMovieFromWatchlist(movieId: number) {
    const { id, role, info } = this.user$$.value;
    if (!id || !role || !info) return;

    return this.http
      .patch<IUser>(`${API_URL}/users/${id}`, {
        data: {
          role,
          info: { ...info, wantToWatchIds: info.wantToWatchIds.filter(id => id !== movieId) },
        },
      })
      .pipe(tap(() => this.getMe().subscribe()));
  }

  auth(email: string, password: string) {
    return this.http.post<ApiAuthResponse>(`${API_URL}/login`, { email, password }).pipe(
      tap(response => {
        const { accessToken } = response;
        setCookie('token', accessToken);

        this.getMe().subscribe();
      })
    );
  }

  logout() {
    removeCookie('token');
    this.setUser({ id: NaN, role: 'guest' });
  }

  getMe() {
    const accessToken = getCookie('token');

    return this.http
      .get<ApiGetMeResponse>(`${API_URL}/${GET_ME_ENDPOINT}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .pipe(
        tap(user => {
          this.setUser({ ...user.data, id: user.id });
        }),
        map(() => this.user$$.value),
        catchError(() => {
          const data: IUser = { id: NaN, role: 'guest' };
          this.setUser(data);
          return of(data);
        })
      );
  }

  private setUser({ id, role, info }: IUser) {
    if (role === 'admin') {
      this.user$$.next({ id, role, info: null });
    } else if (role === 'user') {
      this.user$$.next({ id, role, info });
    } else {
      this.user$$.next({ id: NaN, role: 'guest', info: null });
    }
  }
}
