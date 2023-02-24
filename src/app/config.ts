import { icons } from '@app/shared/assets/icons';
import { ExternalLink, LongDate } from '@app/shared/types/types';
import * as moment from 'moment';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { IMenuItem } from '@app/core/header/nav-button/nav-button.component';
import { paths } from './shared/router/paths';
import { ADMIN_PATHS } from './features/admin/admin-paths';

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

export interface IConfig {
  headerNavigation: IHeaderNavigation;
  socialMedia: ISocialMediaItem[];
}

export const config: IConfig = {
  headerNavigation: {
    user: [
      { title: 'Moje bilety', path: paths.myTickets },
      { title: 'Chcę obejrzeć', path: paths.watchlist },
      { title: 'Wyloguj', path: paths.logout },
    ],
    admin: [
      { title: 'Ustawienia', path: `${paths.admin}/${ADMIN_PATHS.settings}` },
      { title: 'Sale kinowe', path: `${paths.admin}/${ADMIN_PATHS.rooms}` },
      { title: 'Filmy', path: `${paths.admin}/${ADMIN_PATHS.movies}` },
      { title: 'Wyloguj', path: paths.logout },
    ],
  },
  socialMedia: [
    { name: 'facebook', link: 'https://facebook.com', icon: icons.facebook, inFooter: true },
    { name: 'instagram', link: 'https://instagram.com', icon: icons.instagram, inFooter: true },
    { name: 'youtube', link: 'https://youtube.com', icon: icons.youtube, inFooter: true },
  ],
};
