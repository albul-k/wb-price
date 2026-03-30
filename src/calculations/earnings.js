import PropTypes from 'prop-types';
import { round } from '../common/functions';

export function earningsDirty(data) {
    return round(data.priceWithoutSPP - data.resultWBCosts);
}

export function earningsNoDelivery(data) {
    return round(data.earningsDirty - data.deliveryCosts);
}

export function earningsNoTax(data) {
    return round(data.ebitda - data.tax);
}

earningsDirty.PropTypes = {
    priceWithoutSPP: PropTypes.number,
    resultWBCosts: PropTypes.number
};

earningsNoDelivery.PropTypes = {
    earningsDirty: PropTypes.number,
    deliveryCosts: PropTypes.number
};

earningsNoTax.PropTypes = {
    ebitda: PropTypes.number,
    tax: PropTypes.number
};
