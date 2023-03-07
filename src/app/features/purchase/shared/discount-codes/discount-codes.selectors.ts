import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DiscountCodesState } from './discount-codes.interface';

export const selectDiscountCodesState = createFeatureSelector<DiscountCodesState>('discountCodes');

export const selectDiscountCodes = createSelector(selectDiscountCodesState, state => {
  return state.discountCodes;
});
