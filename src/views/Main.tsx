import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import { MoneyFormatInput, PercentFormat } from '../components/numberFormats';
import { TextFieldCustom, TextFieldCustomOutput } from '../components/components';
import Tooltip from '@mui/material/Tooltip';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import InputAdornment from '@mui/material/InputAdornment';


const rowSpacing = 1.5;
const spacing = 3;

const LOGISTICS_TARIFF_RETURN = 33;
const initState = {
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

const taxTypes = [
  {
    value: "type_1",
    label: "Доходы",
  },
  {
    value: "type_2",
    label: "Доходы - Расходы",
  }
];

interface Data {
  reward: number | string
  logisticsTariff: number
  price: number
  costPrice: number
  discount: number | string
  promoСode: number | string
  loyaltyDiscount: number | string
  redemption: number
  taxRate: number | string
  taxType: string
}

function round(num: number) {
  return Math.round((num + Number.EPSILON) * 100) / 100
};

function calc_reward(data: Data) {
  if (data.reward === 0) {
    return 0
  }
  const price = calc_customer_price(data)
  return round(price * (Number(data.reward) / 100))
};

function calc_discount(data: Data) {
  let price = Number(data.price);
  let discount = 0;
  let total_discount = 0;
  if (Number(data.discount) != 0) {
    discount = price * (Number(data.discount) / 100);
    price = price - discount;
    total_discount = discount;
  }
  if (Number(data.promoСode) != 0) {
    discount = (price * (Number(data.promoСode) / 100));
    price = price - discount;
    total_discount = total_discount + discount;
  }
  if (Number(data.loyaltyDiscount) != 0) {
    discount = (price * (Number(data.loyaltyDiscount) / 100));
    total_discount = total_discount + discount;
  }
  if (total_discount === 0) {
    return 0
  }
  return round(total_discount)
}

function calc_delivery(data: Data) {
  const logisticsTariff = Number(data.logisticsTariff);
  const redemption = Number(data.redemption) / 100;
  if (redemption === 0) {
    return round(logisticsTariff + LOGISTICS_TARIFF_RETURN)
  }

  const deliverySoldItems = logisticsTariff * redemption;
  const deliveryNotSoldItems = (logisticsTariff + LOGISTICS_TARIFF_RETURN) * (1 - redemption);
  return round((deliverySoldItems + deliveryNotSoldItems) / redemption)
}

function calc_customer_price(data: Data) {
  if (data.discount === 0) {
    return data.price
  }
  return round(data.price - calc_discount(data))
}

function calc_earnings_dirty(data: Data) {
  return round(calc_customer_price(data) - calc_reward(data))
}

function calc_earnings_no_delivery(data: Data) {
  return round(calc_earnings_dirty(data) - calc_delivery(data))
}

function calc_earnings_no_tax(data: Data) {
  return round(calc_ebitda(data) - calc_tax(data))
}

function calc_ebitda(data: Data) {
  const ebitda = calc_earnings_no_delivery(data) - data.costPrice
  return round(ebitda)
}

function calc_tax(data: Data) {
  const taxRate = Number(data.taxRate) / 100;
  if (taxRate === 0) {
    return 0
  }
  if (data.taxType === "type_1") {
    return round(calc_customer_price(data) * taxRate)
  }
  else if (data.taxType === "type_2") {
    const ebitda = calc_ebitda(data)
    return ebitda < 0 ? 0 : round(calc_ebitda(data) * taxRate)
  }
  return 0
}

export default function Main() {
  const [state, setValue] = React.useState(initState);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue({ ...state, [event.target.name]: event.target.value });
  };

  return (
    <Grid container rowSpacing={rowSpacing} spacing={spacing}>
      <Grid item xs={12} sm={6}>
        <TextFieldCustom
          name="reward"
          value={state.reward}
          label="Процент вознаграждения WB, %"
          InputProps={{
            inputComponent: PercentFormat as any,
            endAdornment: (
              <InputAdornment position="end">
                <Tooltip
                  title="Укажите коэффициент гарантированного вознаграждения по договору"
                >
                  <HelpOutlineIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                </Tooltip>
              </InputAdornment>
            ),
          }}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextFieldCustom
          name="logisticsTariff"
          value={state.logisticsTariff}
          label="Тариф логистики WB, ₽"
          InputProps={{
            inputComponent: MoneyFormatInput as any,
          }}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextFieldCustom
          name="price"
          value={state.price}
          label="Розничная цена, ₽"
          InputProps={{
            inputComponent: MoneyFormatInput as any,
            endAdornment: (
              <InputAdornment position="end">
                <Tooltip
                  title="Цена до скидки"
                >
                  <HelpOutlineIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                </Tooltip>
              </InputAdornment>
            ),
          }}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextFieldCustom
          name="costPrice"
          value={state.costPrice}
          label="Себестоимость товара, ₽"
          InputProps={{
            inputComponent: MoneyFormatInput as any,
            endAdornment: (
              <InputAdornment position="end">
                <Tooltip
                  title="Стоимость одной единицы товара для вас"
                >
                  <HelpOutlineIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                </Tooltip>
              </InputAdornment>
            ),
          }}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextFieldCustom
          name="discount"
          value={state.discount}
          label="Скидка, %"
          InputProps={{
            inputComponent: PercentFormat as any,
          }}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextFieldCustom
          name="promoСode"
          value={state.promoСode}
          label="Промокод, %"
          InputProps={{
            inputComponent: PercentFormat as any,
          }}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextFieldCustom
          name="loyaltyDiscount"
          value={state.loyaltyDiscount}
          label="СПП, %"
          InputProps={{
            inputComponent: PercentFormat as any,
            endAdornment: (
              <InputAdornment position="end">
                <Tooltip
                  title="СПП - скидка постоянного покупателя"
                >
                  <HelpOutlineIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                </Tooltip>
              </InputAdornment>
            ),
          }}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={12} sm={12}>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <TextFieldCustom
            name="redemption"
            value={state.redemption}
            label="Процент выкупа товара"
            onChange={handleInputChange}
            InputProps={{
              inputComponent: PercentFormat as any,
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip
                    title={
                      <React.Fragment>
                        {'Если вы не знаете процент, то:'}<br />
                        {'- для всех категорий, которые требуют примерки 30%'}<br />
                        {'- для остального товара 70-80%'}
                      </React.Fragment>
                    }
                  >
                    <HelpOutlineIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                  </Tooltip>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextFieldCustom
          name="taxRate"
          value={state.taxRate}
          label="Ставка налога, %"
          InputProps={{
            inputComponent: PercentFormat as any,
          }}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextFieldCustom
          select
          name="taxType"
          value={state.taxType}
          label="Система налогооблажения"
          onChange={handleInputChange}
        >
          {taxTypes.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextFieldCustom>
      </Grid>

      <Grid item xs={4}>
        <Typography align="center">
          Выручка
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography align="center">
          Доставка
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography align="center">
          Прибыль
        </Typography>
      </Grid>

      <Grid item xs={4}>
        <Grid container rowSpacing={rowSpacing} spacing={spacing}>
          <Grid item xs={12}>
            <TextFieldCustomOutput
              label="Цена товара до скидок"
              value={state.price}
            />
          </Grid>
          <Grid item xs={12}>
            <TextFieldCustomOutput
              label="Сумма всех скидок"
              value={calc_discount(state)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextFieldCustomOutput
              label="Цена для покупателя"
              value={calc_customer_price(state)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextFieldCustomOutput
              label="Вознаграждение WB"
              value={calc_reward(state)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextFieldCustom
              label="Выручка"
              value={calc_earnings_dirty(state)}
              InputProps={{
                readOnly: true,
                inputComponent: MoneyFormatInput as any,
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip
                      title="Выручка за вычетом скидок и комиссии WB"
                    >
                      <HelpOutlineIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    </Tooltip>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={4}>
        <Grid container rowSpacing={rowSpacing} spacing={spacing}>
          <Grid item xs={12}>
            <TextFieldCustomOutput
              label="Стоимость доставки"
              value={calc_delivery(state)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextFieldCustomOutput
              label="Выручка за вычетом доставки"
              value={calc_earnings_no_delivery(state)}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={4}>
        <Grid container rowSpacing={rowSpacing} spacing={spacing}>
          <Grid item xs={12}>
            <TextFieldCustomOutput
              label="Валовая прибыль до вычета налогов (EBITDA)"
              value={calc_ebitda(state)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextFieldCustomOutput
              label="Сумма налога, руб"
              value={calc_tax(state)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextFieldCustomOutput
              label="Прибыль"
              value={calc_earnings_no_tax(state)}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};