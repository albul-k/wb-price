import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Tooltip from '@mui/material/Tooltip';
import InputAdornment from '@mui/material/InputAdornment';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import StraightenOutlinedIcon from '@mui/icons-material/StraightenOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import ClearIcon from '@mui/icons-material/Clear';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableRowCustom from '../components/TableRowCustom';
import { GridCustom } from '../components/GridCustom';
import { CardCustom } from '../components/CardCustom';
import { MoneyFormatInput, PercentFormat, PercentFormatAny } from '../common/formats';
import { TextFieldCustom } from '../components/TextFieldCustom';
import { initCalculatedData, initInputData, taxTypes } from '../common/data';
import delivery, { deliveryToClient, deliveryToWarehouse } from '../calculations/delivery';
import reward from '../calculations/reward.js';
import { taxBase, taxVAT } from '../calculations/tax';
import { profit } from '../calculations/profit';

export default function Main() {
    const theme = useTheme();
    const [state, setValue] = useState(initInputData);
    const [stateCalc, setCalcValue] = useState(initCalculatedData);
    const [stateInputVolumeDisabled, setInputVolumeDisabled] = useState(false);
    const [stateInputSizesDisabled, setInputSizesDisabled] = useState(true);
    const handleInputChange = (event) => {
        setValue({ ...state, [event.target.name]: event.target.value });
    };
    const handleInputSizesChange = (event) => {
        const length = event.target.name === 'length' ? event.target.value : state.length;
        const width = event.target.name === 'width' ? event.target.value : state.width;
        const height = event.target.name === 'height' ? event.target.value : state.height;
        const volume = (Number(length) * Number(width) * Number(height)) / 1000;
        setValue({ ...state, [event.target.name]: event.target.value, ['volume']: volume });
        if (event.target.value !== '') {
            setInputVolumeDisabled(true);
        } else {
            setInputVolumeDisabled(false);
        }
    };
    const handleInputVolumeChange = (event) => {
        setValue({ ...state, [event.target.name]: event.target.value, ['length']: '', ['width']: '', ['height']: '' });
        if (event.target.value === '') {
            setInputSizesDisabled(false);
        } else {
            setInputSizesDisabled(true);
        }
    };
    const handleClearVolume = () => {
        setValue({ ...state, ['volume']: '' });
        setInputSizesDisabled(false);
        setInputVolumeDisabled(false);
    };
    const handleClearLength = () => {
        setValue({ ...state, ['length']: '' });
        if (state.width === '' && state.height === '') {
            setInputVolumeDisabled(false);
            setInputSizesDisabled(true);
        }
    };
    const handleClearWidth = () => {
        setValue({ ...state, ['width']: '' });
        if (state.length === '' && state.height === '') {
            setInputVolumeDisabled(false);
            setInputSizesDisabled(true);
        }
    };
    const handleClearHeight = () => {
        setValue({ ...state, ['height']: '' });
        if (state.length === '' && state.width === '') {
            setInputVolumeDisabled(false);
            setInputSizesDisabled(true);
        }
    };

    useEffect(() => {
        let calcData = {};
        calcData.priceWithoutSPP = Number(state.price);
        calcData.costPrice = Number(state.costPrice);
        calcData.priceWithSPP = calcData.priceWithoutSPP - (Number(state.spp) / 100) * calcData.priceWithoutSPP;
        calcData.priceWithSPPandWallet = calcData.priceWithSPP - (Number(state.wallet) / 100) * calcData.priceWithSPP;
        calcData.delivery = delivery({
            priceWithoutSPP: calcData.priceWithoutSPP,
            coeffWarehouse: Number(state.coeffWarehouse),
            indLocal: Number(state.indLocal),
            indDistribSales: Number(state.indDistribSales),
            volume: Number(state.volume),
            redemption: Number(state.redemption)
        });
        calcData.deliveryToClient = deliveryToClient({
            priceWithoutSPP: calcData.priceWithoutSPP,
            coeffWarehouse: Number(state.coeffWarehouse),
            indLocal: Number(state.indLocal),
            indDistribSales: Number(state.indDistribSales),
            volume: Number(state.volume)
        });
        calcData.deliveryToWarehouse = deliveryToWarehouse({
            volume: Number(state.volume)
        });
        calcData.reward = reward({
            priceWithoutSPP: calcData.priceWithoutSPP,
            reward: Number(state.reward),
            rewardAdd: Number(state.rewardAdd)
        });
        calcData.advert = calcData.priceWithoutSPP * (Number(state.advert) / 100);
        calcData.equiring = calcData.priceWithSPPandWallet * (Number(state.equiring) / 100);
        calcData.anyCosts = calcData.priceWithoutSPP * (Number(state.anyCosts) / 100);
        calcData.resultWBCosts = calcData.reward + calcData.delivery + calcData.advert + calcData.equiring + calcData.anyCosts;
        calcData.ebitda = calcData.priceWithoutSPP - calcData.resultWBCosts - calcData.costPrice;
        calcData.taxBase = taxBase({
            priceWithSPPandWallet: calcData.priceWithSPPandWallet,
            taxRate: Number(state.taxRate),
            taxType: state.taxType,
            taxVAT: Number(state.taxVAT),
            ebitda: calcData.ebitda
        });
        calcData.taxVAT = taxVAT({
            priceWithSPPandWallet: calcData.priceWithSPPandWallet,
            taxVAT: Number(state.taxVAT)
        });
        calcData.tax = calcData.taxBase + calcData.taxVAT;
        calcData.profit = profit({
            priceWithoutSPP: calcData.priceWithoutSPP,
            resultWBCosts: calcData.resultWBCosts,
            tax: calcData.tax,
            costPrice: calcData.costPrice
        });

        setCalcValue(calcData);
    }, [state]);

    return (
        <GridCustom>
            <Grid item xs={12} sm={12} md={7}>
                <CardCustom>
                    <CardHeader
                        title="Цена и комиссия"
                        action={
                            <IconButton>
                                <AccountBalanceWalletOutlinedIcon />
                            </IconButton>
                        }
                        sx={{
                            backgroundColor: (theme) => theme.palette.secondary.light
                        }}
                    />
                    <CardContent>
                        <GridCustom>
                            <Grid item xs={12} sm={6}>
                                <TextFieldCustom
                                    name="price"
                                    value={state.price}
                                    label="Цена до СПП, ₽"
                                    InputProps={{
                                        inputComponent: MoneyFormatInput,
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <Tooltip title="Цена до скидки для покупателя">
                                                    <HelpOutlineIcon
                                                        sx={{
                                                            color: 'action.active',
                                                            marginRight: (theme) => theme.spacing(1),
                                                            marginY: (theme) => theme.spacing(0.5)
                                                        }}
                                                    />
                                                </Tooltip>
                                            </InputAdornment>
                                        )
                                    }}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextFieldCustom
                                    name="spp"
                                    value={state.spp}
                                    label="СПП, %"
                                    InputProps={{
                                        inputComponent: PercentFormat
                                    }}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextFieldCustom
                                    name="reward"
                                    value={state.reward}
                                    label="Комиссия WB, %"
                                    InputProps={{
                                        inputComponent: PercentFormat,
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <Tooltip title="Укажите коэффициент гарантированного вознаграждения по договору">
                                                    <HelpOutlineIcon
                                                        sx={{
                                                            color: 'action.active',
                                                            marginRight: (theme) => theme.spacing(1),
                                                            marginY: (theme) => theme.spacing(0.5)
                                                        }}
                                                    />
                                                </Tooltip>
                                            </InputAdornment>
                                        )
                                    }}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextFieldCustom
                                    name="wallet"
                                    value={state.wallet}
                                    label="Кошелек, %"
                                    InputProps={{
                                        inputComponent: PercentFormat
                                    }}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextFieldCustom
                                    name="rewardAdd"
                                    value={state.rewardAdd}
                                    label="Дополнительная комиссия, %"
                                    InputProps={{
                                        inputComponent: PercentFormat
                                    }}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextFieldCustom
                                    name="advert"
                                    value={state.advert}
                                    label="ДРР, %"
                                    InputProps={{
                                        inputComponent: PercentFormatAny,
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <Tooltip title="Доля рекламных расходов от цены до СПП, %">
                                                    <HelpOutlineIcon
                                                        sx={{
                                                            color: 'action.active',
                                                            marginRight: (theme) => theme.spacing(1),
                                                            marginY: (theme) => theme.spacing(0.5)
                                                        }}
                                                    />
                                                </Tooltip>
                                            </InputAdornment>
                                        )
                                    }}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextFieldCustom
                                    name="anyCosts"
                                    value={state.anyCosts}
                                    label="Прочее, %"
                                    InputProps={{
                                        inputComponent: PercentFormatAny,
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <Tooltip title="Прочие расходы от цены до СПП, %">
                                                    <HelpOutlineIcon
                                                        sx={{
                                                            color: 'action.active',
                                                            marginRight: (theme) => theme.spacing(1),
                                                            marginY: (theme) => theme.spacing(0.5)
                                                        }}
                                                    />
                                                </Tooltip>
                                            </InputAdornment>
                                        )
                                    }}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextFieldCustom
                                    name="equiring"
                                    value={state.equiring}
                                    label="Эквайринг, %"
                                    InputProps={{
                                        inputComponent: PercentFormatAny,
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <Tooltip title="Эквайринг от цены до СПП, %">
                                                    <HelpOutlineIcon
                                                        sx={{
                                                            color: 'action.active',
                                                            marginRight: (theme) => theme.spacing(1),
                                                            marginY: (theme) => theme.spacing(0.5)
                                                        }}
                                                    />
                                                </Tooltip>
                                            </InputAdornment>
                                        )
                                    }}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                        </GridCustom>
                    </CardContent>
                </CardCustom>
                <CardCustom>
                    <CardHeader
                        title="Габариты"
                        action={
                            <IconButton>
                                <StraightenOutlinedIcon />
                            </IconButton>
                        }
                        sx={{
                            backgroundColor: (theme) => theme.palette.secondary.light
                        }}
                    />
                    <CardContent>
                        <GridCustom>
                            <Grid item xs={12}>
                                <TextFieldCustom
                                    name="volume"
                                    value={state.volume}
                                    label="Объём, л"
                                    type="number"
                                    disabled={stateInputVolumeDisabled}
                                    onChange={handleInputVolumeChange}
                                    InputProps={{
                                        endAdornment:
                                            state.volume !== '' && stateInputSizesDisabled ? (
                                                <InputAdornment position="end">
                                                    <IconButton aria-label="volume-clear" onClick={handleClearVolume} edge="end">
                                                        <ClearIcon />
                                                    </IconButton>
                                                </InputAdornment>
                                            ) : null
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Divider>или</Divider>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextFieldCustom
                                    name="length"
                                    value={state.length}
                                    label="Длина, см"
                                    type="number"
                                    disabled={stateInputSizesDisabled}
                                    onChange={handleInputSizesChange}
                                    InputProps={{
                                        endAdornment:
                                            state.length !== '' ? (
                                                <InputAdornment position="end">
                                                    <IconButton aria-label="length-clear" onClick={handleClearLength} edge="end">
                                                        <ClearIcon />
                                                    </IconButton>
                                                </InputAdornment>
                                            ) : null
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextFieldCustom
                                    name="width"
                                    value={state.width}
                                    label="Ширина, см"
                                    type="number"
                                    disabled={stateInputSizesDisabled}
                                    onChange={handleInputSizesChange}
                                    InputProps={{
                                        endAdornment:
                                            state.width !== '' ? (
                                                <InputAdornment position="end">
                                                    <IconButton aria-label="width-clear" onClick={handleClearWidth} edge="end">
                                                        <ClearIcon />
                                                    </IconButton>
                                                </InputAdornment>
                                            ) : null
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextFieldCustom
                                    name="height"
                                    value={state.height}
                                    label="Высота, см"
                                    type="number"
                                    disabled={stateInputSizesDisabled}
                                    onChange={handleInputSizesChange}
                                    InputProps={{
                                        endAdornment:
                                            state.height !== '' ? (
                                                <InputAdornment position="end">
                                                    <IconButton aria-label="height-clear" onClick={handleClearHeight} edge="end">
                                                        <ClearIcon />
                                                    </IconButton>
                                                </InputAdornment>
                                            ) : null
                                    }}
                                />
                            </Grid>
                        </GridCustom>
                    </CardContent>
                </CardCustom>
                <CardCustom>
                    <CardHeader
                        title="Себестоимость и логистика"
                        action={
                            <IconButton>
                                <LocalShippingOutlinedIcon />
                            </IconButton>
                        }
                        sx={{
                            backgroundColor: (theme) => theme.palette.secondary.light
                        }}
                    />
                    <CardContent>
                        <GridCustom>
                            <Grid item xs={12}>
                                <TextFieldCustom
                                    name="costPrice"
                                    value={state.costPrice}
                                    label="Себестоимость, ₽"
                                    InputProps={{
                                        inputComponent: MoneyFormatInput,
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <Tooltip title="Закупочная стоимость одной единицы товара">
                                                    <HelpOutlineIcon
                                                        sx={{
                                                            color: 'action.active',
                                                            marginRight: (theme) => theme.spacing(1),
                                                            marginY: (theme) => theme.spacing(0.5)
                                                        }}
                                                    />
                                                </Tooltip>
                                            </InputAdornment>
                                        )
                                    }}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                    <TextFieldCustom
                                        name="redemption"
                                        value={state.redemption}
                                        label="Процент выкупа, %"
                                        onChange={handleInputChange}
                                        InputProps={{
                                            inputComponent: PercentFormat,
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <Tooltip
                                                        title={
                                                            <React.Fragment>
                                                                {'Если Вы не знаете процент, то:'}
                                                                <br />
                                                                {'- для всех категорий, которые требуют примерки 30%'}
                                                                <br />
                                                                {'- для остального товара 70-80%'}
                                                            </React.Fragment>
                                                        }
                                                    >
                                                        <HelpOutlineIcon
                                                            sx={{
                                                                color: 'action.active',
                                                                marginRight: (theme) => theme.spacing(1),
                                                                marginY: (theme) => theme.spacing(0.5)
                                                            }}
                                                        />
                                                    </Tooltip>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextFieldCustom
                                    name="coeffWarehouse"
                                    value={state.coeffWarehouse}
                                    label="Коэффициент склада, %"
                                    InputProps={{
                                        inputComponent: PercentFormatAny
                                    }}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextFieldCustom
                                    name="indLocal"
                                    value={state.indLocal}
                                    label="ИЛ"
                                    type="number"
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextFieldCustom
                                    name="indDistribSales"
                                    value={state.indDistribSales}
                                    label="ИРП, %"
                                    InputProps={{
                                        inputComponent: PercentFormatAny
                                    }}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                        </GridCustom>
                    </CardContent>
                </CardCustom>
                <CardCustom>
                    <CardHeader
                        title="Налоги"
                        action={
                            <IconButton>
                                <AssignmentOutlinedIcon />
                            </IconButton>
                        }
                        sx={{
                            backgroundColor: (theme) => theme.palette.secondary.light
                        }}
                    />
                    <CardContent>
                        <GridCustom>
                            <Grid item xs={12} sm={6}>
                                <TextFieldCustom
                                    select
                                    name="taxType"
                                    value={state.taxType}
                                    label="Система налогообложения УСН"
                                    onChange={handleInputChange}
                                >
                                    {taxTypes.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextFieldCustom>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextFieldCustom
                                    name="taxRate"
                                    value={state.taxRate}
                                    label="Ставка налога, %"
                                    InputProps={{
                                        inputComponent: PercentFormat,
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <Tooltip
                                                    title={
                                                        <React.Fragment>
                                                            {'Если "Самозанятый", то выбрать'}
                                                            <br />
                                                            {'систему налогообложения "Доходы" и указать ставку налога'}
                                                        </React.Fragment>
                                                    }
                                                >
                                                    <HelpOutlineIcon
                                                        sx={{
                                                            color: 'action.active',
                                                            marginRight: (theme) => theme.spacing(1),
                                                            marginY: (theme) => theme.spacing(0.5)
                                                        }}
                                                    />
                                                </Tooltip>
                                            </InputAdornment>
                                        )
                                    }}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl>
                                    <FormLabel id="taxVAT">Ставка НДС, %</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="taxVAT"
                                        name="taxVAT"
                                        value={state.taxVAT}
                                        onChange={handleInputChange}
                                    >
                                        <FormControlLabel value="0" control={<Radio />} label="Нет" />
                                        <FormControlLabel value="5" control={<Radio />} label="5 %" />
                                        <FormControlLabel value="7" control={<Radio />} label="7 %" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                        </GridCustom>
                    </CardContent>
                </CardCustom>
            </Grid>
            <Grid
                item
                xs={12}
                sm={12}
                md={5}
                sx={{
                    [theme.breakpoints.up('sm')]: {
                        alignSelf: 'flex-start',
                        position: 'sticky',
                        top: (theme) => theme.spacing(1),
                        height: 'fit-content'
                    }
                }}
            >
                <CardCustom>
                    <CardHeader
                        title="Результат"
                        sx={{
                            marginBottom: 0,
                            // paddingBottom: 0,
                            paddingLeft: '30px',
                            backgroundColor: (theme) => theme.palette.primary.main,
                            color: (theme) => theme.palette.primary.light
                        }}
                    />
                    <CardContent sx={{ pt: 0, pl: 1, pr: 1, pb: '8px!important' }}>
                        <TableContainer>
                            <Table aria-label="results table">
                                <TableBody>
                                    <TableRowCustom
                                        key="priceWithoutSPP"
                                        row={{ name: 'Цена до СПП', value: stateCalc.priceWithoutSPP, percentage: 100 }}
                                    />
                                    <TableRowCustom
                                        key="reward"
                                        row={{
                                            name: 'Вознаграждение (вкл. доп. комиссию)',
                                            value: stateCalc.reward,
                                            percentage: (stateCalc.reward / stateCalc.priceWithoutSPP) * 100
                                        }}
                                    />
                                    <TableRowCustom
                                        key="priceWithSPP"
                                        row={{
                                            name: 'Цена с СПП и кошельком',
                                            value: stateCalc.priceWithSPPandWallet,
                                            percentage: (stateCalc.priceWithSPPandWallet / stateCalc.priceWithoutSPP) * 100
                                        }}
                                    />
                                    <TableRowCustom
                                        key="delivery"
                                        row={{
                                            name: 'Логистика',
                                            value: stateCalc.delivery,
                                            percentage: (stateCalc.delivery / stateCalc.priceWithoutSPP) * 100,
                                            details: [
                                                {
                                                    key: 'deliveryToClient',
                                                    name: 'Доставка к клиенту',
                                                    value: stateCalc.deliveryToClient,
                                                    percentage: (stateCalc.deliveryToClient / stateCalc.priceWithoutSPP) * 100
                                                },
                                                {
                                                    key: 'deliveryToWarehouse',
                                                    name: 'Обратная логистика',
                                                    value: stateCalc.deliveryToWarehouse,
                                                    percentage: (stateCalc.deliveryToWarehouse / stateCalc.priceWithoutSPP) * 100
                                                }
                                            ]
                                        }}
                                    />
                                    <TableRowCustom
                                        key="advert"
                                        row={{
                                            name: 'Реклама',
                                            value: stateCalc.advert,
                                            percentage: (stateCalc.advert / stateCalc.priceWithoutSPP) * 100
                                        }}
                                    />
                                    <TableRowCustom
                                        key="equiring"
                                        row={{
                                            name: 'Эквайринг',
                                            value: stateCalc.equiring,
                                            percentage: (stateCalc.equiring / stateCalc.priceWithoutSPP) * 100
                                        }}
                                    />
                                    <TableRowCustom
                                        key="anyCosts"
                                        row={{
                                            name: 'Прочее',
                                            value: stateCalc.anyCosts,
                                            percentage: (stateCalc.anyCosts / stateCalc.priceWithoutSPP) * 100
                                        }}
                                    />
                                    <TableRowCustom
                                        key="result"
                                        row={{
                                            name: 'Итого удержания WB',
                                            value: stateCalc.resultWBCosts,
                                            percentage: (stateCalc.resultWBCosts / stateCalc.priceWithoutSPP) * 100
                                        }}
                                    />
                                    <TableRowCustom
                                        key="tax"
                                        row={{
                                            name: 'Налоги',
                                            value: stateCalc.tax,
                                            percentage: (stateCalc.tax / stateCalc.priceWithoutSPP) * 100,
                                            details: [
                                                {
                                                    key: 'taxVAT',
                                                    name: 'НДС',
                                                    value: stateCalc.taxVAT,
                                                    percentage: (stateCalc.taxVAT / stateCalc.priceWithoutSPP) * 100
                                                },
                                                {
                                                    key: 'taxBase',
                                                    name: 'УСН',
                                                    value: stateCalc.taxBase,
                                                    percentage: (stateCalc.taxBase / stateCalc.priceWithoutSPP) * 100
                                                }
                                            ]
                                        }}
                                    />
                                    <TableRowCustom
                                        key="profit"
                                        row={{
                                            name: 'Прибыль',
                                            value: stateCalc.profit,
                                            percentage: (stateCalc.profit / stateCalc.priceWithoutSPP) * 100
                                        }}
                                    />
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </CardContent>
                </CardCustom>
            </Grid>
        </GridCustom>
    );
}
