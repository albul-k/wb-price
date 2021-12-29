import { round } from '../common/functions';


interface Discount {
  price: number
  discount: number
  promoСode: number
  loyaltyDiscount: number
};

export default function discount(data: Discount) {
  let price = data.price;
  let discount = 0;
  let total_discount = 0;
  
  if (data.discount != 0) {
    discount = price * (data.discount / 100);
    price = price - discount;
    total_discount = discount;
  }
  if (data.promoСode != 0) {
    discount = (price * (data.promoСode / 100));
    price = price - discount;
    total_discount = total_discount + discount;
  }
  if (data.loyaltyDiscount != 0) {
    discount = (price * (data.loyaltyDiscount / 100));
    total_discount = total_discount + discount;
  }
  if (total_discount === 0) {
    return 0
  }
  return round(total_discount)
};