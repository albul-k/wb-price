import PropTypes from 'prop-types';
import { round } from '../common/functions';

export function earningsDirty(data) {
    return round(data.customerPrice - data.reward);
}

export function earningsNoDelivery(data) {
    return round(data.earningsDirty - data.delivery);
}

export function earningsNoTax(data) {
    return round(data.ebitda - data.tax);
}

earningsDirty.PropTypes = {
    customerPrice: PropTypes.number,
    reward: PropTypes.number
};

earningsNoDelivery.PropTypes = {
    earningsDirty: PropTypes.number,
    delivery: PropTypes.number
};

earningsNoTax.PropTypes = {
    ebitda: PropTypes.number,
    tax: PropTypes.number
};
