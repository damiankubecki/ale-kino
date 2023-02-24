import { inject, Injectable } from '@angular/core';
import { IMovieRepertoire, IShowing } from '@app/shared/types/interfaces';
import { Hour, LongDate } from '@app/shared/types/types';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, switchMap, tap } from 'rxjs';
import { API_URL, REPERTOIRE_ENDPOINT } from '@app/shared/data/api/api';
export interface ISingleShowing {
  day: LongDate;
  hour: Hour;
  occupiedSeatsIds: number[];
  roomId: number;
}

@Injectable({
  providedIn: 'root',
})
export class RepertoireService {
  private http = inject(HttpClient);

  private dayToDisplay$$ = new BehaviorSubject<LongDate>('01/01/2023');
  private repertoire$$ = new BehaviorSubject<IMovieRepertoire[]>([]);

  get dayToDisplay$() {
    return this.dayToDisplay$$.asObservable();
  }

  get dayToDisplay() {
    return this.dayToDisplay$$.value;
  }

  get repertoire$() {
    return this.repertoire$$.asObservable();
  }

  get repertoire() {
    return this.repertoire$$.value;
  }

  setDayToDisplay(date: LongDate) {
    this.dayToDisplay$$.next(date);
  }

  getMovieRepertoire(id: number) {
    return this.repertoire$$.value.find(movie => movie.id === id);
  }

  initMovieRepertoire(movieId: number) {
    return this.http
      .post<IMovieRepertoire>(`${API_URL}/${REPERTOIRE_ENDPOINT}`, {
        movieId,
        showings: [],
      })
      .pipe(tap(repertoire => this.repertoire$$.value.push(repertoire)));
  }

  getShowing(movieId: number, day: LongDate, hour: Hour): ISingleShowing | null {
    const movieRepertoire = this.getMovieRepertoire(movieId);

    if (!movieRepertoire) return null;

    const showing = movieRepertoire.showings.find(showing => {
      const validHour = showing.hours.find(showingHour => showingHour === hour);

      if (showing.day === day && validHour?.length) {
        return true;
      } else return false;
    });

    if (!showing) return null;

    const showingOccupiedSeats = showing.occupiedSeatsIds.find(item => item[hour]);
    const showingHour = showing.hours.find(showingHour => showingHour === hour);

    if (!showingOccupiedSeats || !showingHour) return null;

    return {
      day: showing.day,
      hour: showingHour,
      occupiedSeatsIds: Object.values(showingOccupiedSeats)[0],
      roomId: showing.roomId,
    };
  }

  addShowing(movieId: number, showing: IShowing) {
    return this.http.get<IMovieRepertoire>(`${API_URL}/${REPERTOIRE_ENDPOINT}/${movieId}`).pipe(
      switchMap(response => {
        return this.http.patch<IShowing>(`${API_URL}/${REPERTOIRE_ENDPOINT}/${movieId}`, {
          ...response,
          showings: [...response.showings, showing],
        });
      })
    );
  }

  removeShowing(movieId: number, day: LongDate) {
    return this.http.get<IMovieRepertoire>(`${API_URL}/${REPERTOIRE_ENDPOINT}/${movieId}`).pipe(
      switchMap(response => {
        return this.http.patch<IShowing>(`${API_URL}/${REPERTOIRE_ENDPOINT}/${movieId}`, {
          ...response,
          showings: response.showings.filter(showing => showing.day !== day),
        });
      })
    );
  }

  fetchRepertoire() {
    const result = this.http.get<IMovieRepertoire[]>(`${API_URL}/${REPERTOIRE_ENDPOINT}`);

    result.subscribe({
      next: response => {
        this.repertoire$$.next(response);
      },
    });

    return result;
  }

  updateShowings(movieId: number, showings: IShowing[]) {
    return this.http.patch(`${API_URL}/${REPERTOIRE_ENDPOINT}/${movieId}`, { showings });
  }
}
