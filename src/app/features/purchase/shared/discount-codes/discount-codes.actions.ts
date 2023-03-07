import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { DiscountCode, DiscountCodeNoId, DiscountCodes } from './discount-codes.interface';

export const DiscountActions = createActionGroup({
  source: 'DiscountCodes',
  events: {
    'get discount codes': emptyProps(),
    'edit discount code': props<{ discountCode: DiscountCode }>(),
    'add discount code': props<{ discountCode: DiscountCodeNoId }>(),
    'delete discount code': props<{ id: number }>(),
  },
});

export const DiscountApiActions = createActionGroup({
  source: 'DiscountCodes API',
  events: {
    'discount codes loaded success': props<{ discountCodes: DiscountCodes }>(),
    'discount codes loaded failure': emptyProps(),
    'discount code edited success': props<{ discountCode: DiscountCode }>(),
    'discount code edited failure': emptyProps(),
    'discount code added success': props<{ discountCode: DiscountCode }>(),
    'discount code added failure': emptyProps(),
    'discount code deleted success': props<Pick<DiscountCode, 'id'>>(),
    'discount code deleted failure': emptyProps(),
  },
});
