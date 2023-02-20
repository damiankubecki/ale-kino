import { icons } from '@app/shared/assets/icons';
import { ExternalLink, LongDate } from '@app/shared/types/types';
import * as moment from 'moment';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { IMenuItem } from '@app/core/header/nav-button/nav-button.component';
import { paths } from './shared/router/paths';

export interface IRepertoireConfig {
  dayToDisplayOnInit: LongDate;
  numberOfDaysToDisplay: number;
}

export interface IHeaderNavigation {
  user: IMenuItem[];
  admin: IMenuItem[];
}

export interface ISocialMediaItem {
  name: string;
  link: ExternalLink;
  icon: IconProp;
  inFooter: boolean;
}

export interface IFooterLinkItem {
  name: string;
  link: string;
}

export interface IConfig {
  repertoire: IRepertoireConfig;
  headerNavigation: IHeaderNavigation;
  socialMedia: ISocialMediaItem[];
  footerLinks: IFooterLinkItem[];
}

const today: LongDate = moment().add(0, 'days').format('DD/MM/YYYY') as LongDate;

export const config: IConfig = {
  repertoire: {
    dayToDisplayOnInit: today,
    numberOfDaysToDisplay: 7,
  },
  headerNavigation: {
    user: [
      { title: 'Moje bilety', path: paths.myTickets },
      { title: 'Chcę obejrzeć', path: paths.watchlist },
      { title: 'Wyloguj', path: paths.logout },
    ],
    admin: [
      { title: 'Sale kinowe', path: '/' },
      { title: 'Repertuar', path: '/' },
      { title: 'Kody zniżkowe', path: '/' },
      { title: 'Wyloguj', path: paths.logout },
    ],
  },
  socialMedia: [
    { name: 'facebook', link: 'https://facebook.com', icon: icons.facebook, inFooter: true },
    { name: 'instagram', link: 'https://instagram.com', icon: icons.instagram, inFooter: true },
    { name: 'youtube', link: 'https://youtube.com', icon: icons.youtube, inFooter: true },
  ],
  footerLinks: [
    { name: 'O nas', link: '#' },
    { name: 'Praca', link: '#' },
    { name: 'Regulamin', link: '#' },
    { name: 'Wynajem sal', link: '#' },
  ],
};
