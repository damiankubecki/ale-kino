import { inject, Injectable } from '@angular/core';
import { IMovie, IRepertoireForMovie } from '@myTypes/interfaces';
import { Hour, LongDate } from '@myTypes/types';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { API_URL, MOVIES_ENDPOINT } from 'api';
import { notFoundImageURL } from 'assets/imagesURL';
import * as moment from 'moment';
import { RepertoireService } from '../repertoire/repertoire.service';

export interface IMovieExpanded extends IMovie {
  day: LongDate;
  hours: Hour[];
  isFullDescriptionActive: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private http = inject(HttpClient);
  private repertoireService = inject(RepertoireService);

  private moviesToDisplay$$ = new BehaviorSubject<IMovieExpanded[]>([]);
  private moviesCollection$$ = new BehaviorSubject<IMovie[]>([]);

  get moviesToDisplay$() {
    return this.moviesToDisplay$$.asObservable();
  }

  get moviesCollection$() {
    return this.moviesCollection$$.asObservable();
  }

  constructor() {
    this.fetchMovies();

    combineLatest([this.moviesCollection$, this.repertoireService.repertoire$]).subscribe({
      next: ([movies, repertoire]) => {
        if (!movies.length || !repertoire.length) return;

        this.setMoviesToDisplay(this.repertoireService.dayToDisplay, repertoire);
      },
    });
  }

  setMoviesToDisplay(dayToDisplay: LongDate, repertoire: IRepertoireForMovie[]) {
    this.moviesToDisplay$$.next(
      this.moviesCollection$$.value
        .map(movie => this.getMovieWithAdditionalProps(movie))
        .map(movie => this.getMovieWithScreenings(dayToDisplay, movie, repertoire))
        .map(movie => this.getOnlyFutureHours(movie))
        .filter(movie => movie.hours.length)
        .filter(movie => this.isMoviePlayToday(dayToDisplay, movie, repertoire))
    );
  }

  private fetchMovies() {
    const observableResult = this.http.get<IMovie[]>(`${API_URL}/${MOVIES_ENDPOINT}`);

    observableResult.subscribe({
      next: response => {
        this.moviesCollection$$.next(response);
      },
    });

    return observableResult;
  }

  private isMoviePlayToday(day: LongDate, movie: IMovie, repertoire: IRepertoireForMovie[]) {
    const movieShowings = repertoire.find(m => m.id === movie.id)?.showings;

    return movieShowings?.filter(date => date.day === day).length;
  }

  private getMovieWithScreenings(day: LongDate, movie: IMovie, repertoire: IRepertoireForMovie[]) {
    const movieShowings = repertoire.find(m => m.id === movie.id)?.showings;

    const hours = movieShowings
      ?.filter(date => date.day === day)
      .map(date => date.hours)
      .flat();

    return { ...movie, hours: hours, day } as IMovieExpanded;
  }

  private getOnlyFutureHours(movie: IMovieExpanded) {
    const todayDate = moment().format('DD/MM/YYYY');

    if (todayDate !== movie.day) return movie;

    const futureHours = movie?.hours.filter(hour => {
      const timeNow = moment().locale('pl').format('HH:mm');
      const passedTime = moment(hour, 'HH:mm').locale('pl').format('HH:mm');

      const isAfter = moment(passedTime, 'HH:mm').isAfter(moment(timeNow, 'HH:mm'));

      return isAfter;
    });

    return { ...movie, hours: futureHours };
  }

  private getMovieWithAdditionalProps(movie: IMovie) {
    return {
      ...movie,
      isFullDescriptionActive: false,
      imageURL: movie.imageURL || notFoundImageURL,
    };
  }
}
