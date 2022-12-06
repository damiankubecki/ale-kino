import { Injectable } from '@angular/core';
import { IMovie, IRepertoireForMovie } from '@myTypes/interfaces';
import { Hour, LongDate } from '@myTypes/types';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
import { API_URL, MOVIES_ENDPOINT } from 'api';
import { RepertoireService } from '../repertoire/repertoire.service';
import { notFoundImageURL } from 'assets/imagesURL';
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
  private _MOVIES_TO_DISPLAY = new BehaviorSubject<IMovieExpanded[]>([]);
  private _MOVIES_COLLECTION = new BehaviorSubject<IMovie[]>([]);

  get MOVIES_TO_DISPLAY() {
    return this._MOVIES_TO_DISPLAY;
  }

  constructor(private http: HttpClient, private repertoireService: RepertoireService) {
    this.fetchMovies();

    combineLatest([this._MOVIES_COLLECTION, this.repertoireService.REPERTOIRE]).subscribe({
      next: ([movies, repertoire]) => {
        if (!movies.length || !repertoire.length) return;

        this.setMoviesToDisplay(this.repertoireService.DAY_TO_DISPLAY.value, repertoire);
      },
    });
  }

  setMoviesToDisplay(dayToDisplay: LongDate, repertoire: IRepertoireForMovie[]) {
    this._MOVIES_TO_DISPLAY.next(
      this._MOVIES_COLLECTION.value
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
        this._MOVIES_COLLECTION.next(response);
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
    const newMovieObject = {
      ...movie,
      isFullDescriptionActive: false,
      imageURL: movie.imageURL || notFoundImageURL,
    };

    return newMovieObject;
  }
}
