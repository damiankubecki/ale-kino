import { Injectable } from '@angular/core';
import { LongDate } from '@myTypes/types';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class RepertoireService {
  private _DAY_TO_DISPLAY: LongDate = moment().format('DD/MM/YYYY') as LongDate; // today
  private _NUMBER_OF_DAYS_TO_DISPLAY = 7;

  constructor() {}

  public get DAY_TO_DISPLAY() {
    return this._DAY_TO_DISPLAY;
  }

  public setDayToDisplay(date: LongDate) {
    this._DAY_TO_DISPLAY = date;
  }

  public get NUMBER_OF_DAYS_TO_DISPLAY() {
    return this._NUMBER_OF_DAYS_TO_DISPLAY;
  }
}
