import { Component, OnInit } from '@angular/core';
import { notFoundImageURL } from 'assets/imagesURL';
import { IMovieWithHours, RepertoireService } from '@app/services/repertoire/repertoire.service';
import { map } from 'rxjs';

interface IMovieExtended extends IMovieWithHours {
  isFullDescriptionActive: boolean;
}

@Component({
  selector: 'app-list-of-movies',
  templateUrl: './list-of-movies.component.html',
  styleUrls: ['./list-of-movies.component.scss'],
})
export class ListOfMoviesComponent implements OnInit {
  moviesToDisplay: IMovieExtended[] = [];

  constructor(private RepertoireService: RepertoireService) {}

  ngOnInit(): void {
    this.RepertoireService.MOVIES_TO_DISPLAY.pipe(
      map(movies =>
        movies.map(movie => ({
          ...movie,
          isFullDescriptionActive: false,
          imageURL: movie.imageURL || notFoundImageURL,
        }))
      )
    ).subscribe(movies => {
      console.log(movies);
      this.moviesToDisplay = movies;
    });
  }

  toggleFullDescriptionActivity(movieID: string) {
    const movie = this.moviesToDisplay.find(movie => movie.id === movieID);

    if (!movie) return;
    movie.isFullDescriptionActive = !movie?.isFullDescriptionActive;
  }
}
