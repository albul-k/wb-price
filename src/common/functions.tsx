import { Data } from './interfaces';


export function round(num: number) {
  return Math.round((num + Number.EPSILON) * 100) / 100
};

export function calc_reward(data: Data) {
  if (data.reward === 0) {
    return 0
  }
  const price = calc_customer_price(data)
  return round(price * (Number(data.reward) / 100))
};

export function calc_discount(data: Data) {
  let price = Number(data.price);
  let discount = 0;
  let total_discount = 0;
  if (Number(data.discount) != 0) {
    discount = price * (Number(data.discount) / 100);
    price = price - discount;
    total_discount = discount;
  }
  if (Number(data.promoСode) != 0) {
    discount = (price * (Number(data.promoСode) / 100));
    price = price - discount;
    total_discount = total_discount + discount;
  }
  if (Number(data.loyaltyDiscount) != 0) {
    discount = (price * (Number(data.loyaltyDiscount) / 100));
    total_discount = total_discount + discount;
  }
  if (total_discount === 0) {
    return 0
  }
  return round(total_discount)
};

export function calc_delivery(data: Data) {
  const logisticsTariffReturn = 33;
  const logisticsTariff = Number(data.logisticsTariff);
  const redemption = Number(data.redemption) / 100;
  if (redemption === 0) {
    return round(logisticsTariff + logisticsTariffReturn)
  }

  const deliverySoldItems = logisticsTariff * redemption;
  const deliveryNotSoldItems = (logisticsTariff + logisticsTariffReturn) * (1 - redemption);
  return round((deliverySoldItems + deliveryNotSoldItems) / redemption)
};

export function calc_customer_price(data: Data) {
  if (data.discount === 0) {
    return data.price
  }
  return round(data.price - calc_discount(data))
};

export function calc_earnings_dirty(data: Data) {
  return round(calc_customer_price(data) - calc_reward(data))
};

export function calc_earnings_no_delivery(data: Data) {
  return round(calc_earnings_dirty(data) - calc_delivery(data))
};

export function calc_earnings_no_tax(data: Data) {
  return round(calc_ebitda(data) - calc_tax(data))
};

export function calc_ebitda(data: Data) {
  const ebitda = calc_earnings_no_delivery(data) - data.costPrice
  return round(ebitda)
};

export function calc_tax(data: Data) {
  const taxRate = Number(data.taxRate) / 100;
  if (taxRate === 0) {
    return 0
  }
  if (data.taxType === "type_1") {
    return round(calc_customer_price(data) * taxRate)
  }
  else if (data.taxType === "type_2") {
    const ebitda = calc_ebitda(data)
    return ebitda < 0 ? 0 : round(calc_ebitda(data) * taxRate)
  }
  return 0
};