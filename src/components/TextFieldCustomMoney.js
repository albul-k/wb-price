import React from 'react';
import { MoneyFormatOutput } from '../common/formats';
import { TextFieldCustom } from './TextFieldCustom';

export const TextFieldCustomMoney = (props) => {
    return (
        <TextFieldCustom
            {...props}
            InputProps={{
                readOnly: true,
                inputComponent: MoneyFormatOutput
            }}
        />
    );
};
