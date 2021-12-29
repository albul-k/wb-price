export interface InputData {
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
  earningsDirty: number
  earningsNoDelivery: number
  earningsNoTax: number
  ebitda: number
  tax: number
};