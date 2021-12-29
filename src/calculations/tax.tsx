import { round } from '../common/functions';


interface Tax {
  taxRate: number
  taxType: string
  customerPrice: number
  ebitda: number
};

export default function calc_tax(data: Tax) {
  if (data.taxRate === 0) {
    return 0
  }

  const taxRate = data.taxRate / 100;
  if (data.taxType === "type_1") {
    return round(data.customerPrice * taxRate)
  }
  else if (data.taxType === "type_2") {
    return data.ebitda < 0 ? 0 : round(data.ebitda * taxRate)
  }
  return 0
};