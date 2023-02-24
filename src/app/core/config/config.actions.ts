import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Config, FooterLink } from './config.interface';

export const ConfigActions = createActionGroup({
  source: 'Config',
  events: {
    'get config': emptyProps(),
    'set day to display on init': props<{ daysFromToday: number }>(),
    'set number of days to display': props<{ daysNumber: number }>(),
    'add footer link': props<{ link: FooterLink }>(),
    'delete footer link': props<{ name: string }>(),
  },
});

export const ConfigApiActions = createActionGroup({
  source: 'Config API',
  events: {
    'config loaded success': props<{ config: Config }>(),
    'config loaded failure': emptyProps(),
    'day to display on init set success': props<{ daysFromToday: number }>(),
    'day to display on init set failure': emptyProps(),
    'number of days to display set success': props<{ daysNumber: number }>(),
    'number of days to display set failure': emptyProps(),
    'footer link added success': props<{ footerLinks: FooterLink[] }>(),
    'footer link added failure': emptyProps(),
    'footer link deleted success': props<{ footerLinks: FooterLink[] }>(),
    'footer link deleted failure': emptyProps(),
  },
});
