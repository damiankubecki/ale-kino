import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_URL } from '@app/shared/data/api/api';
import { BehaviorSubject, tap } from 'rxjs';

export interface IDiscount {
  name: string;
  discount: number;
}

@Injectable({ providedIn: 'root' })
export class DiscountService {
  private http = inject(HttpClient);

  private discountCodes$$ = new BehaviorSubject<IDiscount[] | null>(null);

  get discountCodes$() {
    return this.discountCodes$$.asObservable();
  }

  constructor() {
    this.fetchDiscountCodes()
      .pipe(tap(response => this.discountCodes$$.next(response)))
      .subscribe();
  }

  fetchDiscountCodes() {
    return this.http.get<IDiscount[]>(`${API_URL}/discountCodes`);
  }
}
