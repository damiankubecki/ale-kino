import { Hour, LongDate, TicketTypes } from './types';

export interface IMovie {
  id: number;
  title: string;
  description: {
    short: string;
    long: string;
  };
  isPremiere: boolean;
  duration: number;
  minAge: number | null;
  imageURL: string | null;
  genres: string[];
}

export interface IMovieRate {
  id: number;
  userId: number;
  movieId: number;
  rate: number;
}

export interface OccupiedSeats {
  [hour: Hour]: number[];
}

export interface IShowing {
  day: LongDate;
  hours: Hour[];
  occupiedSeatsIds: OccupiedSeats[];
  roomId: number;
}

export interface IMovieRepertoire {
  id: IMovie['id'];
  movieId: number;
  showings: IShowing[];
}

export interface ITicket {
  id: number;
  owner: `${IUserInfo['firstname']} ${IUserInfo['lastname']}`;
  movie: IMovie['title'];
  date: Date;
  price: string;
  row: number;
  seat: number;
  type: TicketTypes;
  codeQR: string;
}

export interface IRatedMovie {
  movieId: IMovie['id'];
  rate: number;
}

export interface IUserInfo {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  ordersIds: ITicket['id'][];
  wantToWatchIds: IMovie['id'][];
  ratedMovies: IRatedMovie[];
}
