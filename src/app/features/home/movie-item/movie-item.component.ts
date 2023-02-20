import { Component, inject, Input, OnInit } from '@angular/core';
import { IMovieExpanded, MoviesService } from '@app/shared/data/movies/movies.service';
import { IUser, UserService } from '@app/features/auth/user/user.service';
import { paths } from '@app/shared/router/paths';
import { map, Observable, tap } from 'rxjs';
import { icons } from '@app/shared/assets/icons';

@Component({
  selector: 'app-movie-item[movie]',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.scss'],
})
export class MovieItemComponent implements OnInit {
  @Input() movie!: IMovieExpanded;

  private userService = inject(UserService);
  private moviesService = inject(MoviesService);

  starIcon = icons.star;
  paths = paths;
  user$: Observable<IUser> = this.userService.user$;
  movieAvgRating$!: Observable<number>;
  ratingOptions = [1, 2, 3, 4, 5];
  userRateOfMovie$ = this.user$.pipe(
    map(user => user.info?.ratedMovies.find(rate => rate.movieId === this.movie.id)?.rate || null)
  );

  ngOnInit() {
    this.getMovieRate();
  }

  toggleFullDescriptionActivity() {
    this.movie.isFullDescriptionActive = !this.movie?.isFullDescriptionActive;
  }

  addMovieToWatchlist() {
    this.userService.addMovieToWatchlist(this.movie.id)?.subscribe();
  }

  addMovieRate(rate: number) {
    this.userService
      .addMovieRate(this.movie.id, rate)
      ?.pipe(tap(() => this.getMovieRate()))
      .subscribe();
  }

  removeMovieFromWatchlist() {
    this.userService.removeMovieFromWatchlist(this.movie.id)?.subscribe();
  }

  private getMovieRate() {
    this.movieAvgRating$ = this.moviesService
      .getMovieAvgRate(this.movie.id)
      .pipe(map(value => Number(value.toFixed(1))));
  }
}
