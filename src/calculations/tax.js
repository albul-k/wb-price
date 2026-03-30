import PropTypes from 'prop-types';
import { round } from '../common/functions';

export default function tax(data) {
    return taxVAT(data) + taxBase(data);
}

export function taxVAT(data) {
    return round(data.priceWithSPPandWallet * (data.taxVAT / (100 + data.taxVAT)));
}

export function taxBase(data) {
    const taxRate = data.taxRate / 100;
    const taxBase = data.taxType === 'type_2' ? data.ebitda : data.priceWithSPPandWallet;
    if (taxBase < 0) {
        return 0;
    }
    return round((taxBase - taxVAT(data)) * taxRate);
}

tax.PropTypes = {
    taxRate: PropTypes.number,
    taxType: PropTypes.string,
    taxVAT: PropTypes.number,
    priceWithSPPandWallet: PropTypes.number,
    ebitda: PropTypes.number
};

taxVAT.PropTypes = {
    taxVAT: PropTypes.number,
    priceWithSPPandWallet: PropTypes.number
};

taxBase.PropTypes = {
    taxRate: PropTypes.number,
    taxType: PropTypes.string,
    taxVAT: PropTypes.number,
    priceWithSPPandWallet: PropTypes.number,
    ebitda: PropTypes.number
};
