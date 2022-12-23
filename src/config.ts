import { icons } from 'assets/icons';
import { ExternalLink, LongDate } from '@myTypes/types';
import * as moment from 'moment';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { IMenuItem } from '@app/components/subcomponents/nav-button/nav-button.component';

export interface IRepertoireConfig {
  dayToDisplayOnInit: LongDate;
  numberOfDaysToDisplay: number;
}

export interface IHeaderActionMenu {
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
  headerActionMenu: IHeaderActionMenu;
  socialMedia: ISocialMediaItem[];
  footerLinks: IFooterLinkItem[];
}

const today: LongDate = moment().add(0, 'days').format('DD/MM/YYYY') as LongDate;

export const config: IConfig = {
  repertoire: {
    dayToDisplayOnInit: today,
    numberOfDaysToDisplay: 7,
  },
  headerActionMenu: {
    user: [
      { title: 'Moje bilety', path: '/' },
      { title: 'Chcę obejrzeć', path: '/' },
      { title: 'Ustawienia', path: '/' },
      { title: 'Wyloguj', path: '/' },
    ],
    admin: [
      { title: 'Sale kinowe', path: '/' },
      { title: 'Repertuar', path: '/' },
      { title: 'Użytkownicy', path: '/' },
      { title: 'Kody zniżkowe', path: '/' },
      { title: 'Wyloguj', path: '/' },
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
