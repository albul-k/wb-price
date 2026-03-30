import React from 'react';
import { PercentFormatAny } from '../common/formats';
import { TextFieldCustom } from './TextFieldCustom';

export const TextFieldCustomPercentage = (props) => {
    return (
        <TextFieldCustom
            {...props}
            InputProps={{
                readOnly: true,
                inputComponent: PercentFormatAny
            }}
        />
    );
};
