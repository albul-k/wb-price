import { round } from '../common/functions';


interface EarningsDirty {
  customerPrice: number
  reward: number
};

interface EarningsNoDelivery {
  earningsDirty: number
  delivery: number
};

interface EarningsNoTax {
  ebitda: number
  tax: number
};

export function earningsDirty(data: EarningsDirty) {
  return round(data.customerPrice - data.reward)
};

export function earningsNoDelivery(data: EarningsNoDelivery) {
  return round(data.earningsDirty - data.delivery)
};

export function earningsNoTax(data: EarningsNoTax) {
  return round(data.ebitda - data.tax)
};