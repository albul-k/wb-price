import { round } from '../common/functions';


interface Delivery {
  logisticsTariff: number
  redemption: number
};

export default function delivery(data: Delivery) {
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