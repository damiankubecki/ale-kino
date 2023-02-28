import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IReservationsItem } from '@app/features/purchase/purchase.service';
import { Hour, LongDate } from '@app/shared/types/types';
import { map } from 'rxjs';
import { API_URL, ROOMS_ENDPOINT } from '../api/api';

export interface IRow {
  seats: number[];
}

export interface IRoom {
  id: number;
  rows: IRow[];
}

@Injectable({
  providedIn: 'root',
})
export class RoomsService {
  private http = inject(HttpClient);

  getRoomById(roomId: number) {
    return this.http.get<IRoom>(`${API_URL}/${ROOMS_ENDPOINT}/${roomId}`);
  }

  getAllRooms() {
    return this.http.get<IRoom[]>(`${API_URL}/${ROOMS_ENDPOINT}`);
  }

  getReservedSeatsInRoom(roomId: number, hour: Hour, date: LongDate) {
    const query = `?date=${date}&hour=${hour}&roomId=${roomId}`;

    return this.http
      .get<IReservationsItem[]>(`${API_URL}/reservations${query}`)
      .pipe(map(items => items[0]));
  }
}
