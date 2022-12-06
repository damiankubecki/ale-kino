import { LongDate } from '@myTypes/types';
import * as moment from 'moment';

interface IRepertoireConfig {
  DAY_TO_DISPLAY_ON_INIT: LongDate;
  NUMBER_OF_DAYS_TO_DISPLAY: number;
}

export interface IConfig {
  repertoire: IRepertoireConfig;
}

export const config: IConfig = {
  repertoire: {
    DAY_TO_DISPLAY_ON_INIT: moment().add(0, 'days').format('DD/MM/YYYY') as LongDate,
    NUMBER_OF_DAYS_TO_DISPLAY: 7,
  },
};
