import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_URL } from '@app/shared/data/api/api';
import { DiscountCode, DiscountCodeNoId, DiscountCodes } from './discount-codes.interface';

@Injectable({ providedIn: 'root' })
export class DiscountCodesService {
  private http = inject(HttpClient);

  getDiscountCodes() {
    return this.http.get<DiscountCodes>(`${API_URL}/discountCodes`);
  }

  editDiscountCode(discountCode: DiscountCode) {
    const { id } = discountCode;

    return this.http.patch<DiscountCode>(`${API_URL}/discountCodes/${id}`, { ...discountCode });
  }

  addDiscountCode(discountCode: DiscountCodeNoId) {
    return this.http.post<DiscountCode>(`${API_URL}/discountCodes`, discountCode);
  }

  deleteDiscountCode({ id }: Pick<DiscountCode, 'id'>) {
    return this.http.delete(`${API_URL}/discountCodes/${id}`);
  }
}
