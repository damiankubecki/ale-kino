import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RepertoireService {
  NUMBER_OF_DAYS_TO_DISPLAY = 7;
  DAY_TO_DISPLAY = 'today';

  constructor() {}

  setDayToDisplay(day: string) {
    this.DAY_TO_DISPLAY = day;
  }
}
