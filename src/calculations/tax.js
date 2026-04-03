import PropTypes from 'prop-types';
import { round } from '../common/functions';

export default function tax(data) {
    return taxVAT(data) + taxBase(data);
}

export function taxVAT(data) {
    return round(data.priceWithSPPandWallet * getVATvalue(data.taxVAT));
}

export function taxBase(data) {
    const taxVATvalue = taxVAT(data);
    const taxRate = data.taxRate / 100;
    if (data.taxType === 'type_2') {
        const taxBase = data.priceWithoutSPP - data.resultWBCosts - data.costPrice - taxVATvalue;
        const tax_1 = taxBase * (data.taxRate / 100);
        const tax_2 = (data.priceWithSPPandWallet - taxVATvalue) * 0.01;
        return tax_1 > tax_2 ? round(tax_1) : round(tax_2);
    } else {
        return round((data.priceWithSPPandWallet - taxVATvalue) * taxRate);
    }
}

export function getVATvalue(taxVAT) {
    return taxVAT / (100 + taxVAT);
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
    priceWithoutSPP: PropTypes.number,
    priceWithSPPandWallet: PropTypes.number,
    ebitda: PropTypes.number,
    resultWBCosts: PropTypes.number,
    costPrice: PropTypes.number
};
