import { Component, inject, Input, OnInit } from '@angular/core';
import { IMovieExpanded } from '@app/shared/data/movies/movies.service';
import { UserService } from '@app/features/auth/user/user.service';
import { paths } from '@app/shared/router/paths';

@Component({
  selector: 'app-movie-item[movie]',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.scss'],
})
export class MovieItemComponent {
  @Input() movie!: IMovieExpanded;

  private userService = inject(UserService);

  isUserLogged: boolean = true;
  paths = paths;

  constructor() {
    this.userService.user$.subscribe({
      next: user => {
        if (user.role === 'guest') {
          this.isUserLogged = false;
        } else {
          this.isUserLogged = true;
        }
      },
    });
  }

  toggleFullDescriptionActivity() {
    this.movie.isFullDescriptionActive = !this.movie?.isFullDescriptionActive;
  }
}
