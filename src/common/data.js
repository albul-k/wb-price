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
    coeffWarehouse: 100,
    price: 1000,
    costPrice: 500,
    volume: 5,
    redemption: 80,
    taxRate: 7,
    taxType: 'type_1'
};

export const initCalculatedData = {
    reward: 0,
    delivery: 0,
    earningsDirty: 0,
    earningsNoDelivery: 0,
    earningsNoTax: 0,
    ebitda: 0,
    tax: 0
};
