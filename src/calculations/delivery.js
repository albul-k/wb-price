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

export function deliveryToWarehouse(data) {
    const tariffFirst = logisticsTariffFirst(data.volume);
    if (data.volume <= 1) {
        return tariffFirst;
    }
    const tariffAdd = logisticsTariffAdd(data.volume);
    return round(tariffFirst + (data.volume - 1) * tariffAdd);
}

export function deliveryToClient(data) {
    return round(
        deliveryToWarehouse(data) * (data.coeffWarehouse / 100) * data.indLocal + data.priceWithoutSPP * (data.indDistribSales / 100)
    );
}

export default function delivery(data) {
    const redemption = data.redemption / 100;
    const logisticsCostsToWarehouse = deliveryToWarehouse(data);
    const logisticsCostsToClient = deliveryToClient(data);
    const result = (logisticsCostsToClient + logisticsCostsToWarehouse) / redemption - logisticsCostsToWarehouse;
    return round(result);
}

deliveryToWarehouse.PropTypes = {
    volume: PropTypes.number
};

deliveryToClient.PropTypes = {
    volume: PropTypes.number,
    coeffWarehouse: PropTypes.number,
    indLocal: PropTypes.number,
    priceWithoutSPP: PropTypes.number,
    indDistribSales: PropTypes.number
};

delivery.PropTypes = {
    priceWithoutSPP: PropTypes.number,
    coeffWarehouse: PropTypes.number,
    indLocal: PropTypes.number,
    indDistribSales: PropTypes.number,
    volume: PropTypes.number,
    redemption: PropTypes.number
};
