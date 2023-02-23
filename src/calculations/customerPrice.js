import PropTypes from 'prop-types';
import { round } from '../common/functions';

export default function customerPrice(data) {
    if (data.discount === 0) {
        return data.price;
    }
    return round(data.price - data.discount);
}

customerPrice.PropTypes = {
    price: PropTypes.number,
    discount: PropTypes.number
};
