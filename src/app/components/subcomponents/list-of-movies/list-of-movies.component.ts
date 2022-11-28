import { Component, OnInit } from '@angular/core';
import { IMovie } from '@myTypes/interfaces';
import { moviesCollection } from 'data/movies';
import { notFoundImageURL } from 'assets/imagesURL';

interface IMovieExtended extends IMovie {
  isFullDescriptionActive: boolean;
}

@Component({
  selector: 'app-list-of-movies',
  templateUrl: './list-of-movies.component.html',
  styleUrls: ['./list-of-movies.component.scss'],
})
export class ListOfMoviesComponent implements OnInit {
  moviesCollection: IMovieExtended[] = moviesCollection.map(movie => ({
    ...movie,
    isFullDescriptionActive: false,
  }));

  constructor() {}

  ngOnInit(): void {
    this.moviesCollection.forEach(movie => {
      if (!movie.imageURL) movie.imageURL = notFoundImageURL;
    });
  }

  toggleFullDescriptionActivity(movieID: string) {
    const movie = this.moviesCollection.find(movie => movie.id === movieID);

    if (!movie) return;
    movie.isFullDescriptionActive = !movie?.isFullDescriptionActive;
  }
}
