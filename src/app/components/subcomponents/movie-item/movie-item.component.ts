import { Component, inject, Input } from '@angular/core';
import { IMovieExpanded } from '@app/services/movies/movies.service';
import { UserService } from '@app/services/user/user.service';
import { IUser } from '@myTypes/interfaces';
import paths from 'router/paths';

@Component({
  selector: 'app-movie-item[movie]',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.scss'],
})
export class MovieItemComponent {
  @Input() movie!: IMovieExpanded;

  private userService = inject(UserService);

  user: IUser | null = null;
  paths = paths;

  constructor() {
    this.userService.userData$.subscribe(user => {
      if (user) {
        this.user = user;
      } else user = null;
    });
  }

  toggleFullDescriptionActivity() {
    this.movie.isFullDescriptionActive = !this.movie?.isFullDescriptionActive;
  }
}
