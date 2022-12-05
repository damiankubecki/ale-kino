import { Injectable } from '@angular/core';
import { IRepertoireForMovie } from '@myTypes/interfaces';
import { LongDate } from '@myTypes/types';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { config } from 'config';
import { API_URL, REPERTOIRE_ENDPOINT } from 'api';

@Injectable({
  providedIn: 'root',
})
export class RepertoireService {
  private _DAY_TO_DISPLAY = new BehaviorSubject<LongDate>(config.repertoire.DAY_TO_DISPLAY_ON_INIT);
  private _REPERTOIRE = new BehaviorSubject<IRepertoireForMovie[]>([]);

  get DAY_TO_DISPLAY() {
    return this._DAY_TO_DISPLAY;
  }

  get REPERTOIRE() {
    return this._REPERTOIRE;
  }

  constructor(private http: HttpClient) {
    this.fetchRepertoire();
  }

  fetchRepertoire() {
    const observableResult = this.http.get<IRepertoireForMovie[]>(
      `${API_URL}/${REPERTOIRE_ENDPOINT}`
    );
    observableResult.subscribe({
      next: response => {
        this.REPERTOIRE.next(response);
      },
    });

    return observableResult;
  }

  setDayToDisplay(date: LongDate) {
    this._DAY_TO_DISPLAY.next(date);
  }
}
