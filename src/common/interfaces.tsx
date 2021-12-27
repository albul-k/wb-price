export interface Data {
  reward: number | string
  logisticsTariff: number
  price: number
  costPrice: number
  discount: number | string
  promoСode: number | string
  loyaltyDiscount: number | string
  redemption: number
  taxRate: number | string
  taxType: string
};

export interface CalculatedData {
  reward: number
  discount: number
  delivery: number
  customerPrice: number
  earnings_dirty: number
  earnings_no_delivery: number
  earnings_no_tax: number
  ebitda: number
  tax: number
};