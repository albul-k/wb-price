import PropTypes from 'prop-types';
import { round } from '../common/functions';

export default function discount(data) {
    let price = data.price;
    let discount = 0;
    let total_discount = 0;

    if (data.discount != 0) {
        discount = price * (data.discount / 100);
        price = price - discount;
        total_discount = discount;
    }
    if (total_discount === 0) {
        return 0;
    }
    return round(total_discount);
}

discount.PropTypes = {
    price: PropTypes.number,
    discount: PropTypes.number
};
