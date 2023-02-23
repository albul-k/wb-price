import PropTypes from 'prop-types';
import { round } from '../common/functions';

export default function reward(data) {
    if (data.reward === 0) {
        return 0;
    }
    return round(data.customerPrice * (data.reward / 100));
}

reward.PropTypes = {
    reward: PropTypes.number,
    customerPrice: PropTypes.number
};
