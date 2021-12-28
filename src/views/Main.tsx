import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Tooltip from '@mui/material/Tooltip';
import InputAdornment from '@mui/material/InputAdornment';

import { MoneyFormatInput, PercentFormat } from '../common/formats';
import { TextFieldCustom } from '../components/TextFieldCustom';
import { TextFieldCustomMoney } from '../components/TextFieldCustomMoney';
import { CalculatedData } from '../common/interfaces';
import { initCalculatedData, initInputData, taxTypes } from '../common/data';
import {
  calc_reward,
  calc_discount,
  calc_delivery,
  calc_customer_price,
  calc_earnings_dirty,
  calc_earnings_no_delivery,
  calc_earnings_no_tax,
  calc_ebitda,
  calc_tax
} from '../common/functions';


export default function Main() {
  const stateCalc: CalculatedData = initCalculatedData;
  const [state, setValue] = useState(initInputData);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue({ ...state, [event.target.name]: event.target.value });
  };

  // Calculated fields
  useEffect(() => { stateCalc.discount = calc_discount(state); },
    [state.price, state.discount, state.promoСode, state.loyaltyDiscount],
  );
  useEffect(() => { stateCalc.delivery = calc_delivery(state); },
    [state.logisticsTariff, state.redemption],
  );
  useEffect(() => { stateCalc.customerPrice = calc_customer_price(state); },
    [stateCalc.discount],
  );
  useEffect(() => { stateCalc.reward = calc_reward(state); },
    [stateCalc.customerPrice, state.reward],
  );
  useEffect(() => { stateCalc.earnings_dirty = calc_earnings_dirty(state); },
    [stateCalc.customerPrice, stateCalc.delivery],
  );
  useEffect(() => { stateCalc.earnings_no_delivery = calc_earnings_no_delivery(state); },
    [stateCalc.earnings_dirty, stateCalc.delivery],
  );
  useEffect(() => { stateCalc.ebitda = calc_ebitda(state); },
    [stateCalc.earnings_no_delivery, state.costPrice],
  );
  useEffect(() => { stateCalc.tax = calc_tax(state); },
    [state.taxRate, state.taxType, stateCalc.customerPrice, stateCalc.ebitda],
  );
  useEffect(() => { stateCalc.earnings_no_tax = calc_earnings_no_tax(state); },
    [stateCalc.ebitda, stateCalc.tax],
  );

  return (
    <Grid container rowSpacing={1.5} spacing={3}>
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
                  <HelpOutlineIcon
                    sx={{
                      color: 'action.active',
                      marginRight: (theme) => theme.spacing(1),
                      marginY: (theme) => theme.spacing(0.5),
                    }} />
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
                  title="Цена до скидки для покупателя"
                >
                  <HelpOutlineIcon
                    sx={{
                      color: 'action.active',
                      marginRight: (theme) => theme.spacing(1),
                      marginY: (theme) => theme.spacing(0.5),
                    }} />
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
                  title="Закупочная стоимость одной единицы товара"
                >
                  <HelpOutlineIcon
                    sx={{
                      color: 'action.active',
                      marginRight: (theme) => theme.spacing(1),
                      marginY: (theme) => theme.spacing(0.5),
                    }} />
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
                  <HelpOutlineIcon
                    sx={{
                      color: 'action.active',
                      marginRight: (theme) => theme.spacing(1),
                      marginY: (theme) => theme.spacing(0.5),
                    }} />
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
                        {'Если Вы не знаете процент, то:'}<br />
                        {'- для всех категорий, которые требуют примерки 30%'}<br />
                        {'- для остального товара 70-80%'}
                      </React.Fragment>
                    }
                  >
                    <HelpOutlineIcon
                      sx={{
                        color: 'action.active',
                        marginRight: (theme) => theme.spacing(1),
                        marginY: (theme) => theme.spacing(0.5),
                      }} />
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
            endAdornment: (
              <InputAdornment position="end">
                <Tooltip
                  title={
                    <React.Fragment>
                      {'Если "Самозанятый", то выбрать'}<br />
                      {'систему налогооблажения "Доходы" и указать ставку налога'}
                    </React.Fragment>
                  }
                >
                  <HelpOutlineIcon
                    sx={{
                      color: 'action.active',
                      marginRight: (theme) => theme.spacing(1),
                      marginY: (theme) => theme.spacing(0.5),
                    }} />
                </Tooltip>
              </InputAdornment>
            ),
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
        <Grid container rowSpacing={1.5} spacing={3}>
          <Grid item xs={12}>
            <TextFieldCustomMoney
              label="Цена товара до скидок"
              value={state.price}
            />
          </Grid>
          <Grid item xs={12}>
            <TextFieldCustomMoney
              label="Сумма всех скидок"
              value={stateCalc.discount}
            />
          </Grid>
          <Grid item xs={12}>
            <TextFieldCustomMoney
              label="Цена для покупателя"
              value={stateCalc.customerPrice}
            />
          </Grid>
          <Grid item xs={12}>
            <TextFieldCustomMoney
              label="Вознаграждение WB"
              value={stateCalc.reward}
            />
          </Grid>
          <Grid item xs={12}>
            <TextFieldCustom
              label="Выручка"
              value={stateCalc.earnings_dirty}
              InputProps={{
                readOnly: true,
                inputComponent: MoneyFormatInput as any,
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip
                      title="Выручка за вычетом скидок и комиссии WB"
                    >
                      <HelpOutlineIcon
                        sx={{
                          color: 'action.active',
                          marginRight: (theme) => theme.spacing(1),
                          marginY: (theme) => theme.spacing(0.5),
                        }} />
                    </Tooltip>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={4}>
        <Grid container rowSpacing={1.5} spacing={3}>
          <Grid item xs={12}>
            <TextFieldCustomMoney
              label="Стоимость доставки"
              value={stateCalc.delivery}
            />
          </Grid>
          <Grid item xs={12}>
            <TextFieldCustomMoney
              label="Выручка за вычетом доставки"
              value={stateCalc.earnings_no_delivery}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={4}>
        <Grid container rowSpacing={1.5} spacing={3}>
          <Grid item xs={12}>
            <TextFieldCustom
              label="Валовая прибыль до вычета налогов (EBITDA)"
              value={stateCalc.ebitda}
              InputProps={{
                readOnly: true,
                inputComponent: MoneyFormatInput as any,
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip
                      title="Выручка за минусом себестоимости"
                    >
                      <HelpOutlineIcon
                        sx={{
                          color: 'action.active',
                          marginRight: (theme) => theme.spacing(1),
                          marginY: (theme) => theme.spacing(0.5),
                        }} />
                    </Tooltip>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextFieldCustomMoney
              label="Сумма налога, руб"
              value={stateCalc.tax}
            />
          </Grid>
          <Grid item xs={12}>
            <TextFieldCustomMoney
              label="Прибыль"
              value={stateCalc.earnings_no_tax}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};