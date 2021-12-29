import { round } from '../common/functions';


interface Reward {
  reward: number
  customerPrice: number
};

export default function reward(data: Reward) {
  if (data.reward === 0) {
    return 0
  }
  return round(data.customerPrice * (data.reward / 100))
};