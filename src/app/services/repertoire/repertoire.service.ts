import { Injectable } from '@angular/core';
import { IMovie } from '@myTypes/interfaces';
import { LongDate } from '@myTypes/types';
import { moviesCollection, moviesDates } from 'data/movies';
import { BehaviorSubject } from 'rxjs';
import { config } from 'config';

export interface IMovieWithHours extends IMovie {
  hours: string[];
}

@Injectable({
  providedIn: 'root',
})
export class RepertoireService {
  private _DAY_TO_DISPLAY = new BehaviorSubject<LongDate>(config.repertoire.DAY_TO_DISPLAY_ON_INIT);
  private _NUMBER_OF_DAYS_TO_DISPLAY = config.repertoire.NUMBER_OF_DAYS_TO_DISPLAY;
  private _MOVIES_TO_DISPLAY = new BehaviorSubject<IMovieWithHours[]>([]);

  constructor() {
    this.setDayToDisplay(config.repertoire.DAY_TO_DISPLAY_ON_INIT);
  }

  public setDayToDisplay(date: LongDate) {
    this._DAY_TO_DISPLAY.next(date);

    this._MOVIES_TO_DISPLAY.next(
      moviesCollection
        .filter(movie => {
          const movieDates = moviesDates.find(m => m.id === movie.id);

          const isMoviePlayToday = movieDates?.dates.filter(
            date => date.day === this._DAY_TO_DISPLAY.value
          ).length;

          return isMoviePlayToday;
        })
        .map(movie => {
          const movieDates = moviesDates.find(m => m.id === movie.id);

          const hours = movieDates?.dates
            .filter(date => date.day === this.DAY_TO_DISPLAY.value)
            .map(date => date.hours)
            .flat();

          const movieWithHours = { ...movie, hours: hours } as IMovieWithHours;

          return movieWithHours;
        })
    );
  }

  public get DAY_TO_DISPLAY() {
    return this._DAY_TO_DISPLAY;
  }

  public get NUMBER_OF_DAYS_TO_DISPLAY() {
    return this._NUMBER_OF_DAYS_TO_DISPLAY;
  }

  public get MOVIES_TO_DISPLAY() {
    return this._MOVIES_TO_DISPLAY;
  }
}
