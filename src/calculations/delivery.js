import PropTypes from 'prop-types';
import { round } from '../common/functions';

export function logisticsTariffFirst(volume) {
    const logisticsTariffMap = [
        [0.2, 23],
        [0.4, 26],
        [0.6, 29],
        [0.8, 30],
        [1, 32]
    ];
    for (const [maxVolume, tariff] of logisticsTariffMap) {
        if (volume <= maxVolume) {
            return tariff;
        }
    }
    return 46;
}

export function logisticsTariffAdd(volume) {
    return volume >= 1 ? 14 : 0;
}

export function calculateLogisticsTariff(volume, coeffWarehouse) {
    const tariffFirst = logisticsTariffFirst(volume);
    const tariffAdd = logisticsTariffAdd(volume);
    return (tariffFirst + (volume - 1) * tariffAdd) * (coeffWarehouse / 100);
}

export function calculateLogisticsTariffReturn(volume) {
    const tariffFirst = logisticsTariffFirst(volume);
    if (volume <= 1) {
        return tariffFirst;
    }
    const tariffAdd = logisticsTariffAdd(volume);
    return tariffFirst + (volume - 1) * tariffAdd;
}

export default function delivery(data) {
    const logisticsTariff = calculateLogisticsTariff(data.volume, data.coeffWarehouse);
    const logisticsTariffReturn = calculateLogisticsTariffReturn(data.volume);
    const redemption = data.redemption / 100;
    if (redemption === 0) {
        return round(logisticsTariff + logisticsTariffReturn);
    }

    const deliverySoldItems = logisticsTariff * redemption;
    const deliveryNotSoldItems = (logisticsTariff + logisticsTariffReturn) * (1 - redemption);
    return round((deliverySoldItems + deliveryNotSoldItems) / redemption);
}

delivery.PropTypes = {
    coeffWarehouse: PropTypes.number,
    volume: PropTypes.number,
    redemption: PropTypes.number
};
