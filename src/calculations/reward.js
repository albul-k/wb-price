import PropTypes from 'prop-types';
import { round } from '../common/functions';

export default function reward(data) {
    return round(data.priceWithoutSPP * ((data.reward + data.rewardAdd) / 100));
}

reward.PropTypes = {
    reward: PropTypes.number,
    rewardAdd: PropTypes.number,
    priceWithoutSPP: PropTypes.number
};
