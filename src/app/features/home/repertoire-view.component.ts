import { Component, inject } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  selectDayToDisplayOnInit,
  selectNumberOfDaysToDisplay,
} from '@app/core/config/config.selectors';
import { RepertoireService } from '@app/shared/data/repertoire/repertoire.service';
import { paths } from '@app/shared/router/paths';
import { LongDate } from '@app/shared/types/types';
import { TopbarService } from '@app/topbar.service';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { tap } from 'rxjs';

@Component({
  selector: 'app-repertoire-view',
  templateUrl: './repertoire-view.component.html',
  styleUrls: ['./repertoire-view.component.scss'],
})
export class RepertoireViewComponent {
  private store = inject(Store);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private topbarService = inject(TopbarService);
  private repertoireService = inject(RepertoireService);

  constructor() {
    this.route.params
      .pipe(
        tap(params => {
          this.topbarService.setTopbarContent('Repertuar');
          this.readParams(params);
        })
      )
      .subscribe();
  }

  readParams(params: Params) {
    const date = params['date'] as LongDate;

    let isDateValid = false;

    this.store
      .select(selectNumberOfDaysToDisplay)
      .pipe(
        tap(number => {
          for (let i = 0; i < number; i++) {
            const dateToCheck = moment()
              .locale('pl')
              .startOf('week')
              .add(i, 'days')
              .format('DD/MM/YYYY');
            const isDateFuture = moment()
              .locale('pl')
              .startOf('week')
              .add(i, 'days')
              .isAfter(moment().subtract(1, 'day'));

            if (date === dateToCheck && isDateFuture) {
              isDateValid = true;
            }
          }
        })
      )
      .subscribe();

    this.store
      .select(selectDayToDisplayOnInit)
      .pipe(
        tap(day => {
          if (!date)
            this.router.navigate([
              paths.repertoire,
              moment().locale('pl').add(day, 'days').format('DD/MM/YYYY'),
            ]);
          if (!isDateValid && date) return this.router.navigate([paths.notFound]);
          if (date) this.repertoireService.setDayToDisplay(date);
          return;
        })
      )
      .subscribe();
  }
}
