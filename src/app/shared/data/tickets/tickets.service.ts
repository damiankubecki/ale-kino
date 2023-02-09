import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { API_URL, TICKETS_TYPES_ENDPOINT } from '../api/api';

export interface ITicketType {
  id: number;
  name: string;
  description: string;
  price: number;
}

@Injectable({
  providedIn: 'root',
})
export class TicketsService implements OnDestroy {
  private http = inject(HttpClient);
  private ticketsTypes$$ = new BehaviorSubject<ITicketType[]>([]);
  private subscription$: Subscription;

  get ticketsTypes$() {
    return this.ticketsTypes$$.asObservable();
  }

  constructor() {
    this.subscription$ = this.fetchTicketsTypes().subscribe(response => {
      this.ticketsTypes$$.next(response);
    });
  }

  private fetchTicketsTypes() {
    return this.http.get<ITicketType[]>(`${API_URL}/${TICKETS_TYPES_ENDPOINT}`);
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }
}
