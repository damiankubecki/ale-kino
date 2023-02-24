import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ConfigState } from './config.interface';

export const selectConfigState = createFeatureSelector<ConfigState>('config');

export const selectConfig = createSelector(selectConfigState, state => {
  return state;
});

export const selectDayToDisplayOnInit = createSelector(selectConfigState, state => {
  return state.dayToDisplayOnInit;
});

export const selectNumberOfDaysToDisplay = createSelector(selectConfigState, state => {
  return state.numberOfDaysToDisplay;
});

export const selectFooterLinks = createSelector(selectConfigState, state => {
  return state.footerLinks;
});
