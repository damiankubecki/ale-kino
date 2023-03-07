import { createReducer, on } from '@ngrx/store';
import { DiscountApiActions } from './discount-codes.actions';
import { DiscountCodesState } from './discount-codes.interface';
import { initialDiscountCodesState } from './discount-codes.state';

export const discountCodesReducer = createReducer(
  initialDiscountCodesState,
  on(
    DiscountApiActions.discountCodesLoadedSuccess,
    (state, { discountCodes }): DiscountCodesState => {
      return { discountCodes };
    }
  ),
  on(
    DiscountApiActions.discountCodeEditedSuccess,
    (state, { discountCode }): DiscountCodesState => {
      return {
        ...state,
        discountCodes: state.discountCodes.map(code =>
          code.id === discountCode.id ? discountCode : code
        ),
      };
    }
  ),
  on(DiscountApiActions.discountCodeAddedSuccess, (state, { discountCode }): DiscountCodesState => {
    return {
      ...state,
      discountCodes: [...state.discountCodes, discountCode],
    };
  }),
  on(DiscountApiActions.discountCodeDeletedSuccess, (state, { id }): DiscountCodesState => {
    return {
      ...state,
      discountCodes: state.discountCodes.filter(code => code.id !== id),
    };
  })
);
