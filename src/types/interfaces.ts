import { Hour, LongDate, TicketTypes } from './types';

export interface IRouterPaths {
  home: string;
  admin: string;
  buyTicket: string;
  reservation: string;
  summary: string;
}

export interface IMovie {
  id: number;
  title: string;
  description: {
    short: string;
    long: string;
  };
  isPremiere: boolean;
  duration: string;
  minAge: number | null;
  imageURL: string | null;
  genres: string[];
  rate: string;
}

export interface IShowing {
  day: LongDate;
  hours: Hour[];
  roomId: number;
}

export interface IRepertoireForMovie {
  id: IMovie['id'];
  showings: IShowing[];
}

export interface ITicket {
  id: string;
  owner: `${IUserInfo['firstname']} ${IUserInfo['lastname']}`;
  movie: IMovie['title'];
  date: Date;
  price: string;
  row: number;
  seat: number;
  type: TicketTypes;
  codeQR: string;
}

export interface IOrder {
  firstname: IUserInfo['firstname'];
  lastname: IUserInfo['lastname'];
  email: IUserInfo['email'];
  sendPromo: boolean;
  totalPrice: number;
  phone?: IUserInfo['phone'];
  discountCode?: string;
}

export interface IRatedMovie {
  id: IMovie['id'];
  rate: number;
}

export interface IUserInfo {
  firstname: string;
  lastname: string;
  email: string;
  phone: number;
  ordersIds: ITicket['id'][];
  wantToWatchIds: IMovie['id'][];
  ratedMovies: IRatedMovie[];
}

export interface IUser {
  type: 'user' | 'admin';
  info?: IUserInfo;
}
