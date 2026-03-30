import deliveryCosts from '../calculations/deliveryCosts';
import reward from '../calculations/reward';
import tax from '../calculations/tax';

test('reward', () => {
    expect(reward({ reward: 0, priceWithoutSPP: 100 })).toEqual(0);
    expect(reward({ reward: 10, priceWithoutSPP: 100 })).toEqual(10);
});

test('tax', () => {
    expect(tax({ taxRate: 0, taxType: 'type_1', priceWithoutSPP: 1000, ebitda: 254.25 })).toEqual(0);
    expect(tax({ taxRate: 7, taxType: 'type_1', priceWithoutSPP: 1000, ebitda: 0 })).toEqual(70);
    expect(tax({ taxRate: 7, taxType: 'type_2', priceWithoutSPP: 1000, ebitda: 254.25 })).toEqual(17.8);
    expect(tax({ taxRate: 7, taxType: 'type_2', priceWithoutSPP: 1000, ebitda: -1000 })).toEqual(0);
    expect(tax({ taxRate: 7, taxType: 'type_undef', priceWithoutSPP: 1000, ebitda: 0 })).toEqual(0);
});

test('deliveryCosts', () => {
    expect(deliveryCosts({ coeffWarehouse: 200, volume: 5, redemption: 50 })).toEqual(510);
    expect(deliveryCosts({ coeffWarehouse: 100, volume: 5, redemption: 100 })).toEqual(102);
    expect(deliveryCosts({ coeffWarehouse: 50, volume: 5, redemption: 0 })).toEqual(153);
    expect(deliveryCosts({ coeffWarehouse: 200, volume: 1, redemption: 50 })).toEqual(160);
    expect(deliveryCosts({ coeffWarehouse: 100, volume: 1, redemption: 100 })).toEqual(32);
    expect(deliveryCosts({ coeffWarehouse: 50, volume: 1, redemption: 0 })).toEqual(48);
});
