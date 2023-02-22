import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
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
}
