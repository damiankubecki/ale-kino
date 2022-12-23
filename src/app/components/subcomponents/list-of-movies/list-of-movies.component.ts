import { Component, inject } from '@angular/core';
import { RepertoireService } from '@app/services/repertoire/repertoire.service';
import { IMovieExpanded, MoviesService } from '@app/services/movies/movies.service';

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
    this.repertoireService.dayToDisplay$.subscribe({
      next: newDay => {
        this.moviesService.setMoviesToDisplay(newDay, this.repertoireService.repertoire);

        this.moviesService.moviesToDisplay$.subscribe(movies => {
          this.moviesToDisplay = movies;
        });
      },
    });
  }
}
