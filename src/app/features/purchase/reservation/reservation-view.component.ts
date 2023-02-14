import { Component, inject } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MoviesService } from '@app/shared/data/movies/movies.service';
import { TopbarService } from '@app/topbar.service';
import { Hour, LongDate } from '@app/shared/types/types';
import { paths } from '@app/shared/router/paths';
import { IRoom, RoomsService } from '@app/shared/data/rooms/rooms.service';
import { RepertoireService } from '@app/shared/data/repertoire/repertoire.service';
import { ITicketType, TicketsService } from '@app/shared/data/tickets/tickets.service';
import { IOrderInProgress, IReservedSeat, PurchaseService } from '../purchase.service';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-reservation-view',
  templateUrl: './reservation-view.component.html',
  styleUrls: ['./reservation-view.component.scss'],
})
export class ReservationViewComponent {
  private moviesService = inject(MoviesService);
  private topbarService = inject(TopbarService);
  private repertoireService = inject(RepertoireService);
  private roomsService = inject(RoomsService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private purchaseService = inject(PurchaseService);
  private ticketsServcie = inject(TicketsService);

  order: IOrderInProgress | null = null;
  ticketsTypes: ITicketType[] = [];
  occupiedSeatsIds: number[] = [];
  room: IRoom | null = null;

  constructor() {
    this.topbarService.setTopbarContent('Rezerwacja');

    this.purchaseService.order$.subscribe(state => {
      this.order = state;
    });

    this.ticketsServcie.ticketsTypes$.subscribe(value => {
      this.ticketsTypes = value;
    });

    this.route.params.subscribe(params => {
      this.readParams(params);
    });
  }

  handleSubmit() {
    this.router.navigate([paths.buyTicket]);
  }

  handleSeatClick(event: Event) {
    const target = event.target as HTMLButtonElement;
    if (!target) return;

    const ticketType = this.ticketsTypes[0];
    const seatId = Number(target.dataset['id']);
    const row = Number(target.dataset['rowIndex']) + 1;
    const seat = Number(target.dataset['colIndex']) + 1;

    const choosenSeat: IReservedSeat = { ticketType, seatId, row, seat };

    this.purchaseService.addSeat(choosenSeat);
  }

  isSeatInOrder(id: number) {
    return this.order?.reservedSeats.find(item => item.seatId === id);
  }

  private readParams(params: Params) {
    const day = params['day'] as LongDate;
    const hour = params['hour'] as Hour;
    const movie = this.moviesService.getMovieById(params['id']) || null;
    const showing = this.repertoireService.getShowing(Number(params['id']), day, hour);

    if (!movie || !showing) {
      this.router.navigate([paths.notFound]);
      return;
    }

    if (
      this.order?.movie?.id !== movie.id ||
      this.order?.showing?.day !== day ||
      this.order?.showing?.hour !== hour
    ) {
      this.purchaseService.clearOrder();
    }

    this.occupiedSeatsIds = showing.occupiedSeatsIds;
    this.purchaseService.setShowing(day, hour);
    this.purchaseService.setMovie(movie.id);
    this.roomsService
      .getRoomById(showing.roomId)
      .pipe(
        tap(room => {
          this.room = room;
          this.purchaseService.setRoom(room.id);
        })
      )
      .subscribe();
  }

  back() {
    window.history.back();
  }
}
