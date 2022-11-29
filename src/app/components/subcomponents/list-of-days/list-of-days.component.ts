import { Component, OnInit } from '@angular/core';
import { RepertoireService } from '@app/services/repertoire/repertoire.service';
import { ShortDate, LongDate } from '@myTypes/types';
import * as moment from 'moment';

interface IButton {
  content: ShortDate | string;
  date: LongDate;
}

@Component({
  selector: 'app-list-of-days',
  templateUrl: './list-of-days.component.html',
  styleUrls: ['./list-of-days.component.scss'],
})
export class ListOfDaysComponent {
  activeDay: string = '';
  buttons: IButton[] = [
    { content: 'Dziś', date: moment().format('DD/MM/YYYY') as LongDate },
    { content: 'Jutro', date: this.getDateAfterXDays(1, 'long') as LongDate },
  ];

  constructor(public RepertoireService: RepertoireService) {
    this.RepertoireService.DAY_TO_DISPLAY.subscribe(day => {
      this.activeDay = day;
    });

    for (let i = 2; i <= this.RepertoireService.NUMBER_OF_DAYS_TO_DISPLAY - 1; i++) {
      this.buttons[i] = {
        content: this.getDateAfterXDays(i, 'short') as ShortDate,
        date: this.getDateAfterXDays(i, 'long') as LongDate,
      };
    }
  }

  private getDateAfterXDays(days: number, type: 'long' | 'short') {
    if (!days) return null;

    return moment()
      .locale('pl')
      .add(days, 'days')
      .format(type === 'long' ? 'DD/MM/YYYY' : 'DD/MM') as LongDate | ShortDate;
  }
}
