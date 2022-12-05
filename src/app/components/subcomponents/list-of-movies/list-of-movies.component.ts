import { Component } from '@angular/core';
import { IUser } from '@myTypes/interfaces';
import { RepertoireService } from '@app/services/repertoire/repertoire.service';
import { IMovieExpanded, MoviesService } from '@app/services/movies/movies.service';
import { UserService } from '@app/services/user/user.service';
import paths from 'router/paths';

@Component({
  selector: 'app-list-of-movies',
  templateUrl: './list-of-movies.component.html',
  styleUrls: ['./list-of-movies.component.scss'],
})
export class ListOfMoviesComponent {
  moviesToDisplay: IMovieExpanded[] = [];
  reservationPath: string = paths.reservation;
  user: IUser | null = null;

  constructor(
    private repertoireService: RepertoireService,
    private moviesService: MoviesService,
    private userService: UserService
  ) {
    this.userService.USER_DATA.subscribe(user => {
      if (user) {
        this.user = user;
      } else user = null;
    });

    this.repertoireService.DAY_TO_DISPLAY.subscribe({
      next: newDay => {
        this.moviesService.setMoviesToDisplay(newDay, this.repertoireService.REPERTOIRE.value);
        this.moviesService.MOVIES_TO_DISPLAY.subscribe(movies => {
          this.moviesToDisplay = movies;
        });
      },
    });
  }

  toggleFullDescriptionActivity(movieID: number) {
    const movie = this.moviesToDisplay.find(movie => movie.id === movieID);

    if (!movie) return;
    movie.isFullDescriptionActive = !movie?.isFullDescriptionActive;
  }
}
