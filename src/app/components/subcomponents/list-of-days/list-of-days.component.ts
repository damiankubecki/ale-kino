import { Component, OnInit } from '@angular/core';
import { RepertoireService } from '@app/services/repertoire/repertoire.service';
import { ShortDate, LongDate } from '@myTypes/types';
import { config } from 'config';
import * as moment from 'moment';

interface IButton {
  content: ShortDate | string;
  date: LongDate;
  disabled: boolean;
}

@Component({
  selector: 'app-list-of-days',
  templateUrl: './list-of-days.component.html',
  styleUrls: ['./list-of-days.component.scss'],
})
export class ListOfDaysComponent {
  activeDay: string = '';
  buttonsCollection: IButton[] = [];

  constructor(private RepertoireService: RepertoireService) {}

  ngOnInit() {
    this.activeDay = this.RepertoireService.dayToDisplay;

    for (let i = 0; i <= config.repertoire.numberOfDaysToDisplay - 1; i++) {
      this.buttonsCollection.push(this.getButtonProps(i));
    }
  }

  setDayToDisplay(date: LongDate) {
    this.activeDay = date;
    this.RepertoireService.setDayToDisplay(date);
  }

  private getButtonProps(dayFromToday: number) {
    const longDate = moment()
      .locale('pl')
      .startOf('week')
      .add(dayFromToday, 'days')
      .format('DD/MM/YYYY') as LongDate;

    const shortDate = longDate.slice(0, 5) as ShortDate;

    const today = moment().locale('pl').format('DD/MM');

    let isDisabled = true;
    if (
      !moment().isAfter(moment().locale('pl').startOf('week').add(dayFromToday, 'days')) ||
      today === shortDate
    ) {
      isDisabled = false;
    }

    const buttonProps: IButton = {
      content: shortDate,
      date: longDate,
      disabled: isDisabled,
    };

    return buttonProps;
  }
}
