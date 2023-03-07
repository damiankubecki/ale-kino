import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, combineLatest, map, of, switchMap } from 'rxjs';
import { DiscountActions, DiscountApiActions } from './discount-codes.actions';
import { DiscountCodes } from './discount-codes.interface';
import { DiscountCodesService } from './discount-codes.service';

@Injectable()
export class DiscountCodesEffects {
  private actions$ = inject(Actions);
  private discountCodesService = inject(DiscountCodesService);

  getDiscountCodes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DiscountActions.getDiscountCodes),
      switchMap(() => {
        return this.discountCodesService.getDiscountCodes();
      }),
      map((discountCodes: DiscountCodes) =>
        DiscountApiActions.discountCodesLoadedSuccess({ discountCodes })
      ),
      catchError(() => {
        window.alert('Wystąpił błąd podczas pobierania kodów rabatowych');
        return of(DiscountApiActions.discountCodesLoadedFailure);
      })
    );
  });

  editDiscountCode$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DiscountActions.editDiscountCode),
      switchMap(({ discountCode }) => {
        return this.discountCodesService.editDiscountCode(discountCode);
      }),
      map(discountCode => DiscountApiActions.discountCodeEditedSuccess({ discountCode })),
      catchError(() => {
        window.alert('Wystąpił błąd podczas edycji kodu rabatowego');
        return of(DiscountApiActions.discountCodeEditedFailure);
      })
    );
  });

  addDiscountCode$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DiscountActions.addDiscountCode),
      switchMap(({ discountCode }) => {
        return this.discountCodesService.addDiscountCode(discountCode);
      }),
      map(discountCode => DiscountApiActions.discountCodeAddedSuccess({ discountCode })),
      catchError(() => {
        window.alert('Wystąpił błąd podczas dodawania kodu rabatowego');
        return of(DiscountApiActions.discountCodeAddedFailure);
      })
    );
  });

  deleteDiscountCode$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DiscountActions.deleteDiscountCode),
      switchMap(({ id }) => {
        return combineLatest([of(id), this.discountCodesService.deleteDiscountCode({ id })]);
      }),
      map(([id]) => DiscountApiActions.discountCodeDeletedSuccess({ id })),
      catchError(() => {
        window.alert('Wystąpił błąd podczas usuwania kodu rabatowego');
        return of(DiscountApiActions.discountCodeDeletedFailure);
      })
    );
  });
}
