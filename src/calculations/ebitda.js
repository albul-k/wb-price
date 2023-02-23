import PropTypes from 'prop-types';
import { round } from '../common/functions';

export default function ebitda(data) {
    return round(data.earningsNoDelivery - data.costPrice);
}

ebitda.PropTypes = {
    earningsNoDelivery: PropTypes.number,
    costPrice: PropTypes.number
};
