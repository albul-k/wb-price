import { Data, CalculatedData } from './interfaces';


export const taxTypes = [
    {
      value: "type_1",
      label: "Доходы",
    },
    {
      value: "type_2",
      label: "Доходы - Расходы",
    }
  ];
  
export const initInputData: Data = {
    reward: 20,
    logisticsTariff: 30,
    price: 1000,
    costPrice: 500,
    discount: "",
    promoСode: "",
    loyaltyDiscount: "",
    redemption: 80,
    taxRate: 7,
    taxType: "type_1"
  };
  
export const initCalculatedData: CalculatedData = {
    reward: 0,
    discount: 0,
    delivery: 0,
    customerPrice: 0,
    earnings_dirty: 0,
    earnings_no_delivery: 0,
    earnings_no_tax: 0,
    ebitda: 0,
    tax: 0
  };