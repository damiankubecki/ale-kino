export interface DiscountCode {
  id: number;
  name: string;
  discount: number;
}

export type DiscountCodeNoId = Omit<DiscountCode, 'id'>;

export type DiscountCodes = DiscountCode[];

export interface DiscountCodesState {
  discountCodes: DiscountCodes;
}
