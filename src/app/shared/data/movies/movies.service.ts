import { inject, Injectable } from '@angular/core';
import { IMovie, IMovieRepertoire } from '@app/shared/types/interfaces';
import { Hour, LongDate } from '@app/shared/types/types';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject} from 'rxjs';
import { API_URL, MOVIES_ENDPOINT } from '@app/shared/data/api/api';
import { notFoundImageURL } from '@app/shared/assets/imagesURL';
import * as moment from 'moment';

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

  private moviesToDisplay$$ = new BehaviorSubject<IMovieExpanded[]>([]);
  private moviesCollection$$ = new BehaviorSubject<IMovie[]>([]);

  get moviesToDisplay$() {
    return this.moviesToDisplay$$.asObservable();
  }

  get moviesCollection$() {
    return this.moviesCollection$$.asObservable();
  }

  setMoviesToDisplay(dayToDisplay: LongDate, repertoire: IMovieRepertoire[]) {
    this.moviesToDisplay$$.next(
      this.moviesCollection$$.value
        .map(movie => this.getMovieWithAdditionalProps(movie))
        .map(movie => this.getMovieWithShowings(dayToDisplay, movie, repertoire))
        .map(movie => this.getOnlyFutureHours(movie))
        .filter(movie => movie.hours.length)
        .filter(movie => this.isMoviePlayToday(dayToDisplay, movie, repertoire))
    );
  }

  getMovieById(id: number) {
    return this.moviesCollection$$.value.find(movie => movie.id == id);
  }

  fetchMovies() {
    const result = this.http.get<IMovie[]>(`${API_URL}/${MOVIES_ENDPOINT}`);

    result.subscribe({
      next: response => {
        this.moviesCollection$$.next(response);
      },
    });

    return result;
  }

  private isMoviePlayToday(day: LongDate, movie: IMovie, repertoire: IMovieRepertoire[]) {
    const movieShowings = repertoire.find(m => m.id === movie.id)?.showings;

    return movieShowings?.filter(date => date.day === day).length;
  }

  private getMovieWithShowings(day: LongDate, movie: IMovie, repertoire: IMovieRepertoire[]) {
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