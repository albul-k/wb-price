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
    reward: 20,
    logisticsTariff: 50,
    price: 1000,
    costPrice: 500,
    discount: '',
    redemption: 80,
    taxRate: 7,
    taxType: 'type_1'
};

export const initCalculatedData = {
    reward: 0,
    discount: 0,
    delivery: 0,
    customerPrice: 0,
    earningsDirty: 0,
    earningsNoDelivery: 0,
    earningsNoTax: 0,
    ebitda: 0,
    tax: 0
};
