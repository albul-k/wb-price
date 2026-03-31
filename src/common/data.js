export const taxTypes = [
    {
        value: 'type_1',
        label: 'Доходы'
    },
    {
        value: 'type_2',
        label: 'Доходы - Расходы'
    }
];

export const initInputData = {
    reward: 23,
    rewardAdd: 2,
    spp: 25,
    indLocal: 1.5,
    indDistribSales: 1,
    advert: 10,
    equiring: 4,
    anyCosts: 5,
    taxVAT: 0,
    wallet: 5,
    coeffWarehouse: 200,
    price: 1000,
    costPrice: 100,
    volume: 5,
    length: '',
    width: '',
    height: '',
    redemption: 50,
    taxRate: 6,
    taxType: 'type_1'
};

export const initCalculatedData = {
    costPrice: 0,
    priceWithoutSPP: 0,
    priceWithSPP: 0,
    priceWithSPPandWallet: 0,
    advert: 0,
    equiring: 0,
    anyCosts: 0,
    reward: 0,
    delivery: 0,
    deliveryToClient: 0,
    deliveryToWarehouse: 0,
    profit: 0,
    earningsNoDelivery: 0,
    earningsNoTax: 0,
    ebitda: 0,
    tax: 0,
    taxVAT: 0,
    taxBase: 0,
    resultWBCosts: 0
};
