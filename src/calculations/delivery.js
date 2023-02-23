import PropTypes from 'prop-types';
import { round } from '../common/functions';

export default function delivery(data) {
    const logisticsTariffReturn = 33;
    const redemption = data.redemption / 100;
    if (redemption === 0) {
        return round(data.logisticsTariff + logisticsTariffReturn);
    }

    const deliverySoldItems = data.logisticsTariff * redemption;
    const deliveryNotSoldItems = (data.logisticsTariff + logisticsTariffReturn) * (1 - redemption);
    return round((deliverySoldItems + deliveryNotSoldItems) / redemption);
}

delivery.PropTypes = {
    logisticsTariff: PropTypes.number,
    redemption: PropTypes.number
};
