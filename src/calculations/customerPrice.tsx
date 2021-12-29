import { round } from '../common/functions';


interface CustomerPrice {
  price: number
  discount: number
};

export default function customerPrice(data: CustomerPrice) {
    if (data.discount === 0) {
      return data.price
    }
    return round(data.price - data.discount)
  };