import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
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
export class TicketsService {
  private http = inject(HttpClient);
  private ticketsTypes$$ = new BehaviorSubject<ITicketType[]>([]);

  get ticketsTypes$() {
    return this.ticketsTypes$$.asObservable();
  }

  constructor() {
    this.fetchTicketsTypes()
      .pipe(tap(response => this.ticketsTypes$$.next(response)))
      .subscribe();
  }

  private fetchTicketsTypes() {
    return this.http.get<ITicketType[]>(`${API_URL}/${TICKETS_TYPES_ENDPOINT}`);
  }
}
