import PropTypes from 'prop-types';
import { round } from '../common/functions';

export function profit(data) {
    return round(data.priceWithoutSPP - data.resultWBCosts - data.tax - data.costPrice);
}

profit.PropTypes = {
    priceWithoutSPP: PropTypes.number,
    resultWBCosts: PropTypes.number,
    tax: PropTypes.number,
    costPrice: PropTypes.number
};
