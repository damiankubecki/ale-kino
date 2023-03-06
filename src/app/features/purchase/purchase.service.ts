import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_URL } from '@app/shared/data/api/api';
import { MoviesService } from '@app/shared/data/movies/movies.service';
import { RoomsService } from '@app/shared/data/rooms/rooms.service';
import { ITicketType } from '@app/shared/data/tickets/tickets.service';
import { IMovie } from '@app/shared/types/interfaces';
import { Hour, LongDate } from '@app/shared/types/types';
import * as moment from 'moment';
import { BehaviorSubject, skip, switchMap } from 'rxjs';

export interface IReservationsItem {
  id: number;
  roomId: number;
  date: LongDate;
  hour: Hour;
  seatsIds: number[];
}

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
  roomId?: number;
  reservedSeats: IReservedSeat[];
}

export interface IOrder {
  id: number;
  movie: IMovie;
  owner: {
    email: string;
    name: string;
    phone?: number;
  };
  showing: {
    day: LongDate;
    hour: Hour;
  };
  reservedSeats: IReservedSeat[];
  date: string;
  roomId: number;
}

@Injectable({
  providedIn: 'root',
})
export class PurchaseService {
  private http = inject(HttpClient);
  private moviesService = inject(MoviesService);
  private roomService = inject(RoomsService);
  private order$$ = new BehaviorSubject<IOrderInProgress>({ reservedSeats: [] });

  get order$() {
    return this.order$$.asObservable();
  }

  constructor() {
    this.order$$.pipe(skip(1)).subscribe(value => {
      window.localStorage.setItem('order-in-progress', JSON.stringify(value || ''));
    });

    const orderInProgressLocalStorage = window.localStorage.getItem('order-in-progress');
    if (orderInProgressLocalStorage) {
      this.order$$.next(JSON.parse(orderInProgressLocalStorage));
    }
  }

  setSeatAsReserved(seatId: number) {
    const { showing, roomId } = this.order$$.value;

    return this.roomService.getReservedSeatsInRoom(roomId || 0, showing!.hour, showing!.day).pipe(
      switchMap(response => {
        if (response) {
          return this.http.patch<IReservationsItem>(`${API_URL}/reservations/${response.id}`, {
            ...response,
            seatsIds: [...response.seatsIds, seatId],
          });
        } else {
          return this.http.post<IReservationsItem>(`${API_URL}/reservations`, {
            date: showing?.day,
            hour: showing?.hour,
            roomId,
            seatsIds: [seatId],
          });
        }
      })
    );
  }

  setSeatAsUnreserved(seatId: number) {
    const { showing, roomId } = this.order$$.value;

    return this.roomService.getReservedSeatsInRoom(roomId || 0, showing!.hour, showing!.day).pipe(
      switchMap(response => {
        return this.http.patch<IReservationsItem>(`${API_URL}/reservations/${response.id}`, {
          ...response,
          seatsIds: response.seatsIds.filter(id => id !== seatId),
        });
      })
    );
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
    this.setSeatAsUnreserved(seatId).subscribe();

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

  setRoom(roomId: number) {
    this.order$$.next({
      ...this.order$$.value,
      roomId,
    });
  }

  sendOrder() {
    const { movie, owner, reservedSeats, showing, roomId } = this.order$$.value;

    return this.http.post<IOrder>(`${API_URL}/orders`, {
      id: NaN,
      movie: { id: movie?.id, title: movie?.title, minAge: movie?.minAge },
      owner: {
        name: `${owner?.firstname} ${owner?.lastname}`,
        email: owner?.email,
        phone: owner?.phone || null,
      },
      reservedSeats,
      showing,
      roomId,
      date: `${moment().format('DD/MM/YYYY')} ${moment().format('HH:mm')}`,
    });
  }
}
