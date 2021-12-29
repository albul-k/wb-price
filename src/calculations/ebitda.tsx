import { round } from '../common/functions';


interface Ebitda {
    earningsNoDelivery: number
    costPrice: number
};

export default function ebitda(data: Ebitda) {
    return round(data.earningsNoDelivery - data.costPrice)
  };