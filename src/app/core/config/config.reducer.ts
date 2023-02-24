import { createReducer, on } from '@ngrx/store';
import { ConfigApiActions } from './config.actions';
import { ConfigState } from './config.interface';
import { initialConfigState } from './config.state';

export const configReducer = createReducer(
  initialConfigState,
  on(ConfigApiActions.configLoadedSuccess, (state, { config }): ConfigState => {
    return config;
  }),
  on(ConfigApiActions.dayToDisplayOnInitSetSuccess, (state, { daysFromToday }): ConfigState => {
    return { ...state, dayToDisplayOnInit: daysFromToday };
  }),
  on(ConfigApiActions.numberOfDaysToDisplaySetSuccess, (state, { daysNumber }): ConfigState => {
    return { ...state, numberOfDaysToDisplay: daysNumber };
  }),
  on(ConfigApiActions.footerLinkAddedSuccess, (state, { footerLinks }): ConfigState => {
    return { ...state, footerLinks };
  }),
  on(ConfigApiActions.footerLinkDeletedSuccess, (state, { footerLinks }): ConfigState => {
    return { ...state, footerLinks };
  })
);
