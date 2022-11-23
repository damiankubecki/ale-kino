import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class RepertoireService {
  // on init displays today
  private _DAY_TO_DISPLAY = moment().format('DD/MM/YYYY');
  // on init displays list of 7 days
  private _NUMBER_OF_DAYS_TO_DISPLAY = 7;

  constructor() {}

  public get DAY_TO_DISPLAY() {
    return this._DAY_TO_DISPLAY;
  }

  public set DAY_TO_DISPLAY(day: string) {
    if (day) this._DAY_TO_DISPLAY = day;
  }

  public get NUMBER_OF_DAYS_TO_DISPLAY() {
    return this._NUMBER_OF_DAYS_TO_DISPLAY;
  }
}
