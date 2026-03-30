import PropTypes, { func } from 'prop-types';
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

export function deliveryCostsToWarehouse(data) {
    const tariffFirst = logisticsTariffFirst(data.volume);
    if (data.volume <= 1) {
        return tariffFirst;
    }
    const tariffAdd = logisticsTariffAdd(data.volume);
    return round(tariffFirst + (data.volume - 1) * tariffAdd);
}

export function deliveryCostsToClient(data) {
    return round(
        deliveryCostsToWarehouse(data) * (data.coeffWarehouse / 100) * data.indLocal + data.priceWithoutSPP * (data.indDistribSales / 100)
    );
}

export default function deliveryCosts(data) {
    const redemption = 1 - data.redemption / 100;
    const logisticsCostsToWarehouse = deliveryCostsToWarehouse(data);
    const logisticsCostsToClient = deliveryCostsToClient(data);
    const result = logisticsCostsToWarehouse / redemption - logisticsCostsToWarehouse + logisticsCostsToClient / redemption;
    return round(result);
}

deliveryCostsToWarehouse.PropTypes = {
    volume: PropTypes.number
};

deliveryCostsToClient.PropTypes = {
    volume: PropTypes.number,
    coeffWarehouse: PropTypes.number,
    indLocal: PropTypes.number,
    priceWithoutSPP: PropTypes.number,
    indDistribSales: PropTypes.number
};

deliveryCosts.PropTypes = {
    priceWithoutSPP: PropTypes.number,
    coeffWarehouse: PropTypes.number,
    indLocal: PropTypes.number,
    indDistribSales: PropTypes.number,
    volume: PropTypes.number,
    redemption: PropTypes.number
};
