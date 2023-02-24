import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { ConfigActions, ConfigApiActions } from './config.actions';
import { Config } from './config.interface';
import { ConfigService } from './config.service';

@Injectable()
export class ConfigEffects {
  private actions$ = inject(Actions);
  private configService = inject(ConfigService);

  getConfig$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ConfigActions.getConfig),
      switchMap(() => {
        return this.configService.getConfig();
      }),
      map((config: Config) => ConfigApiActions.configLoadedSuccess({ config })),
      catchError(() => {
        window.alert('Config loaded failure');
        return of(ConfigApiActions.configLoadedFailure);
      })
    );
  });

  setDayToDisplayOnInit$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ConfigActions.setDayToDisplayOnInit),
      switchMap(({ daysFromToday }) => {
        return this.configService.setDayToDisplayOnInit(daysFromToday);
      }),
      map(({ dayToDisplayOnInit }) =>
        ConfigApiActions.dayToDisplayOnInitSetSuccess({ daysFromToday: dayToDisplayOnInit })
      ),
      catchError(() => {
        window.alert('Set failure');
        return of(ConfigApiActions.dayToDisplayOnInitSetFailure);
      })
    );
  });

  setNumberOfDaysToDisplay$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ConfigActions.setNumberOfDaysToDisplay),
      switchMap(({ daysNumber }) => {
        return this.configService.setNumberOfDaysToDisplay(daysNumber);
      }),
      map(({ numberOfDaysToDisplay }) =>
        ConfigApiActions.numberOfDaysToDisplaySetSuccess({ daysNumber: numberOfDaysToDisplay })
      ),
      catchError(() => {
        window.alert('Set failure');
        return of(ConfigApiActions.numberOfDaysToDisplaySetFailure);
      })
    );
  });

  addFooterLink$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ConfigActions.addFooterLink),
      switchMap(({ link }) => {
        return this.configService.addFooterLink(link);
      }),
      map(({ footerLinks }) => ConfigApiActions.footerLinkAddedSuccess({ footerLinks })),
      catchError(() => {
        window.alert('Link added failure');
        return of(ConfigApiActions.footerLinkAddedFailure);
      })
    );
  });

  deleteFooterLink$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ConfigActions.deleteFooterLink),
      switchMap(({ name }) => {
        return this.configService.deleteFooterLink(name);
      }),
      map(({ footerLinks }) => ConfigApiActions.footerLinkDeletedSuccess({ footerLinks })),
      catchError(() => {
        window.alert('Link deleted failure');
        return of(ConfigApiActions.footerLinkDeletedFailure);
      })
    );
  });
}
