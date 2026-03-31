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
    if (data.taxType === 'type_2') {
        const tax_1 = data.priceWithSPPandWallet * 0.01;
        const tax_2 = data.ebitda * taxRate;
        return data.priceWithSPPandWallet * 0.01 > data.ebitda * taxRate ? round(tax_1) : round(tax_2);
    } else {
        return round((data.priceWithSPPandWallet - taxVAT(data)) * taxRate);
    }
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
