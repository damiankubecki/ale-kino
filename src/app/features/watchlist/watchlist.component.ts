import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { API_URL } from '@app/shared/data/api/api';
import { IMovie } from '@app/shared/types/interfaces';
import { TopbarService } from '@app/topbar.service';
import { filter, map, Observable, of, switchMap } from 'rxjs';
import { UserService } from '../auth/user/user.service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.scss'],
})
export class WatchlistComponent {
  private http = inject(HttpClient);
  private topbarService = inject(TopbarService);
  private userService = inject(UserService);

  moviesOnWatchlist$!: Observable<IMovie[]>;

  constructor() {
    this.topbarService.setTopbarContent('Chcę obejrzeć');

    this.moviesOnWatchlist$ = this.userService.user$.pipe(
      map(user => user.info?.wantToWatchIds),
      filter(Boolean),
      switchMap(ids => {
        const filters = ids?.map((id, index) => (index === 0 ? `?id=${id}` : `&id=${id}`)).join('');

        return ids.length ? this.http.get<IMovie[]>(`${API_URL}/movies/${filters}`) : of([]);
      })
    );
  }

  removeFromList(movieId: number) {
    this.userService.removeMovieFromWatchlist(movieId)?.subscribe();
  }
}
