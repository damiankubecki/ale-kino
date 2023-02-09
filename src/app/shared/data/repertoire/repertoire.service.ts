import { inject, Injectable } from '@angular/core';
import { IMovieRepertoire, IShowing } from '@app/shared/types/interfaces';
import { Hour, LongDate } from '@app/shared/types/types';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { config } from '@app/config';
import { API_URL, REPERTOIRE_ENDPOINT } from '@app/shared/data/api/api';
import { PurchaseService } from '@app/features/purchase/purchase.service';
import { Router } from '@angular/router';
import { paths } from '@app/shared/router/paths';

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
  private purchaseService = inject(PurchaseService);

  private dayToDisplay$$ = new BehaviorSubject<LongDate>(config.repertoire.dayToDisplayOnInit);
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
    this.http.patch(`${API_URL}/${REPERTOIRE_ENDPOINT}/${movieId}`, { showings }).subscribe(() => {
      this.purchaseService.clearOrder();
      window.location.reload();
    });
  }
}
