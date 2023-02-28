import { Component, inject } from '@angular/core';
import { RepertoireService } from '@app/shared/data/repertoire/repertoire.service';
import { IMovieExpanded, MoviesService } from '@app/shared/data/movies/movies.service';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-list-of-movies',
  templateUrl: './list-of-movies.component.html',
  styleUrls: ['./list-of-movies.component.scss'],
})
export class ListOfMoviesComponent {
  private repertoireService = inject(RepertoireService);
  private moviesService = inject(MoviesService);

  moviesToDisplay: IMovieExpanded[] = [];

  constructor() {
    this.repertoireService.dayToDisplay$
      .pipe(
        tap(day => this.moviesService.setMoviesToDisplay(day, this.repertoireService.repertoire))
      )
      .subscribe();

    this.moviesService.moviesToDisplay$
      .pipe(tap(movies => (this.moviesToDisplay = movies)))
      .subscribe();
  }
}
