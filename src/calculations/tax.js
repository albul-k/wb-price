import PropTypes from 'prop-types';
import { round } from '../common/functions';

export default function tax(data) {
    if (data.taxRate === 0) {
        return 0;
    }

    const taxRate = data.taxRate / 100;
    if (data.taxType === 'type_1') {
        return round(data.customerPrice * taxRate);
    } else if (data.taxType === 'type_2') {
        return data.ebitda < 0 ? 0 : round(data.ebitda * taxRate);
    }
    return 0;
}

tax.PropTypes = {
    taxRate: PropTypes.number,
    taxType: PropTypes.string,
    customerPrice: PropTypes.number,
    ebitda: PropTypes.number
};
