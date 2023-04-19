import discount from '../calculations/discount';
import customerPrice from '../calculations/customerPrice';
import delivery from '../calculations/delivery';
import reward from '../calculations/reward';
import tax from '../calculations/tax';

test('reward', () => {
    expect(reward({ reward: 0, customerPrice: 100 })).toEqual(0);
    expect(reward({ reward: 10, customerPrice: 100 })).toEqual(10);
});

test('tax', () => {
    expect(tax({ taxRate: 0, taxType: 'type_1', customerPrice: 1000, ebitda: 254.25 })).toEqual(0);
    expect(tax({ taxRate: 7, taxType: 'type_1', customerPrice: 1000, ebitda: 0 })).toEqual(70);
    expect(tax({ taxRate: 7, taxType: 'type_2', customerPrice: 1000, ebitda: 254.25 })).toEqual(17.8);
    expect(tax({ taxRate: 7, taxType: 'type_2', customerPrice: 1000, ebitda: -1000 })).toEqual(0);
    expect(tax({ taxRate: 7, taxType: 'type_undef', customerPrice: 1000, ebitda: 0 })).toEqual(0);
});

test('discount', () => {
    expect(discount({ price: 1000, discount: 0 })).toEqual(0);
    expect(discount({ price: 1000, discount: 5 })).toEqual(50);
    expect(discount({ price: 1000, discount: 100 })).toEqual(1000);
});

test('customerPrice', () => {
    expect(customerPrice({ price: 1000, discount: 0 })).toEqual(1000);
    expect(customerPrice({ price: 1000, discount: 900 })).toEqual(100);
});

test('delivery #1', () => {
    expect(delivery({ logisticsTariff: 30, redemption: 80 })).toEqual(50);
    expect(delivery({ logisticsTariff: 30, redemption: 100 })).toEqual(30);
    expect(delivery({ logisticsTariff: 30, redemption: 0 })).toEqual(80);
});
