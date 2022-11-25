import { Hour, LongDate, TicketTypes } from './types';

export interface IRouterPaths {
  home: string;
  admin: string;
  buyTicket: string;
  reservation: string;
  summary: string;
}

export interface IMovieDate {
  day: LongDate;
  hours: Hour[];
}

export interface IMovie {
  id: string;
  title: string;
  dates: IMovieDate[];
  description: string;
  isPremiere: boolean;
  fullDescription?: string;
  duration?: string;
  minAge?: number;
  imageURL?: string;
  genres?: string[];
  rate?: number;
}

export interface ITicket {
  id: string;
  owner: `${IUser['firstname']} ${IUser['lastname']}`;
  movie: IMovie['title'];
  date: Date;
  price: string;
  row: number;
  seat: number;
  type: TicketTypes;
  codeQR: string;
}

export interface IUser {
  firstname: string;
  lastname: string;
  email: string;
  phone: number;
  tickets: ITicket['id'][];
  wantToWatchIds: IMovie['id'];
}

export interface IOrder {
  firstname: IUser['firstname'];
  lastname: IUser['lastname'];
  email: IUser['email'];
  sendPromo: boolean;
  totalPrice: number;
  phone?: IUser['phone'];
  discountCode?: string;
}
