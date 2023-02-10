import { inject, Injectable, OnDestroy } from '@angular/core';
import { MoviesService } from '@app/shared/data/movies/movies.service';
import { ITicketType } from '@app/shared/data/tickets/tickets.service';
import { IMovie } from '@app/shared/types/interfaces';
import { Hour, LongDate } from '@app/shared/types/types';
import { BehaviorSubject, skip, Subscription } from 'rxjs';

export interface IReservedSeat {
  seatId: number;
  row: number;
  seat: number;
  ticketType: ITicketType;
}

export interface IOrderOwner {
  firstname: string;
  lastname: string;
  email: string;
  phone?: string;
}

export interface IOrderInProgress {
  movie?: IMovie;
  owner?: IOrderOwner;
  showing?: {
    day: LongDate;
    hour: Hour;
  };
  reservedSeats: IReservedSeat[];
}

@Injectable({
  providedIn: 'root',
})
export class PurchaseService implements OnDestroy {
  private moviesService = inject(MoviesService);
  private order$$ = new BehaviorSubject<IOrderInProgress>({ reservedSeats: [] });
  private subscription$: Subscription;

  get order$() {
    return this.order$$.asObservable();
  }

  clearOrder() {
    this.order$$.next({ reservedSeats: [], owner: this.order$$.value.owner });
  }

  addSeat(seat: IReservedSeat) {
    const { seatId } = seat;

    if (this.order$$.value?.reservedSeats.find(item => item.seatId === seatId)) {
      this.removeSeat(seatId);
    } else {
      this.order$$.next({
        ...this.order$$.value,
        reservedSeats: [...this.order$$.value.reservedSeats, seat].sort((a, b) => a.row - b.row),
      });
    }
  }

  removeSeat(seatId: number) {
    this.order$$.next({
      ...this.order$$.value,
      reservedSeats: [
        ...this.order$$.value.reservedSeats.filter(seat => seat.seatId !== seatId),
      ].sort((a, b) => a.row - b.row),
    });
  }

  setOwner(person: IOrderOwner) {
    this.order$$.next({
      ...this.order$$.value,
      owner: person,
    });
  }

  setMovie(movieId: number) {
    const movie = this.moviesService.getMovieById(movieId);

    if (movie) {
      this.order$$.next({ ...this.order$$.value, movie });
    }
  }

  setShowing(day: LongDate, hour: Hour) {
    this.order$$.next({ ...this.order$$.value, showing: { day, hour } });
  }

  setTicketType(seatId: number, selectedTicket: ITicketType) {
    this.order$$.next({
      ...this.order$$.value,
      reservedSeats: this.order$$.value.reservedSeats.map(seat =>
        seat.seatId === seatId ? { ...seat, ticketType: selectedTicket } : seat
      ),
    });
  }

  constructor() {
    this.subscription$ = this.order$$.pipe(skip(1)).subscribe(value => {
      window.localStorage.setItem('order-in-progress', JSON.stringify(value));
    });

    const savedOrder = JSON.parse(window.localStorage.getItem('order-in-progress') || '');
    if (savedOrder) {
      this.order$$.next(savedOrder);
    }
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }
}
