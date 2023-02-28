import { Component, inject } from '@angular/core';
import { RepertoireService } from '@app/shared/data/repertoire/repertoire.service';
import { ShortDate, LongDate } from '@app/shared/types/types';
import * as moment from 'moment';
import { paths } from '@app/shared/router/paths';
import { Store } from '@ngrx/store';
import { selectNumberOfDaysToDisplay } from '@app/core/config/config.selectors';
import { tap } from 'rxjs';

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
  private store = inject(Store);
  private repertoireService = inject(RepertoireService);

  activeDay: LongDate = '01/01/2023';
  buttonsCollection: IButton[] = [];
  paths = paths;

  ngOnInit() {
    this.repertoireService.dayToDisplay$.pipe(tap(day => (this.activeDay = day))).subscribe();
    this.store
      .select(selectNumberOfDaysToDisplay)
      .pipe(
        tap(number => {
          for (let i = 0; i <= number - 1; i++) {
            this.buttonsCollection.push(this.getButtonProps(i));
          }
        })
      )
      .subscribe();
  }

  setDayToDisplay(date: LongDate) {
    this.activeDay = date;
    this.repertoireService.setDayToDisplay(date);
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
