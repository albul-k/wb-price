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
// import { CalculatedData } from '../common/interfaces';
import { initCalculatedData, initInputData, taxTypes } from '../common/data';
import discount from '../calculations/discount';
import customerPrice from '../calculations/customerPrice';
import delivery from '../calculations/delivery';
import reward from '../calculations/reward';
import ebitda from '../calculations/ebitda';
import tax from '../calculations/tax';
import {
  earningsDirty,
  earningsNoDelivery,
  earningsNoTax
} from '../calculations/earnings';


export default function Main() {
  const [state, setValue] = useState(initInputData);
  const [stateCalc, setCalcValue] = useState(initCalculatedData);

  function updateCalcValues() {
    let calcData: any = {};
    calcData.discount = discount({
      'price': Number(state.price),
      'discount': Number(state.discount)
    });
    calcData.delivery = delivery({
      'logisticsTariff': Number(state.logisticsTariff),
      'redemption': Number(state.redemption)
    });
    calcData.customerPrice = customerPrice({
      'price': Number(state.price),
      'discount': calcData.discount
    });
    calcData.reward = reward({
      'customerPrice': calcData.customerPrice,
      'reward': Number(state.reward)
    });
    calcData.earningsDirty = earningsDirty({
      'customerPrice': calcData.customerPrice,
      'reward': calcData.reward
    });
    calcData.earningsNoDelivery = earningsNoDelivery({
      'earningsDirty': calcData.earningsDirty,
      'delivery': calcData.delivery
    });
    calcData.ebitda = ebitda({
      'earningsNoDelivery': calcData.earningsNoDelivery,
      'costPrice': state.costPrice
    });
    calcData.tax = tax({
      'taxRate': Number(state.taxRate),
      'taxType': state.taxType,
      'customerPrice': calcData.customerPrice,
      'ebitda': calcData.ebitda
    });
    calcData.earningsNoTax = earningsNoTax({
      'ebitda': calcData.ebitda,
      'tax': calcData.tax
    });
    
    setCalcValue(calcData);
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue({ ...state, [event.target.name]: event.target.value });
  };
  
  useEffect(() => {
    updateCalcValues();
  }, [state],
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
      <Grid item xs={12} sm={6}>
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
      <Grid item xs={12} sm={6}>
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
              value={stateCalc.earningsDirty}
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
              value={stateCalc.earningsNoDelivery}
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
              value={stateCalc.earningsNoTax}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};