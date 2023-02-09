import { IMovieRepertoire } from './interfaces';

export type TicketTypes = 'normalny' | 'ulgowy' | 'rodzinny' | 'voucher';

export type Hour = `${string}:${string}`;
export type ShortDate = `${string}/${string}`;
export type LongDate = `${string}/${string}/${string}`;

export type Repertoire = IMovieRepertoire[];

export type ExternalLink = `https://${string}`;

export type UsersRoles = 'admin' | 'user' | 'guest';
