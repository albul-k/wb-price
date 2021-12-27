import React from 'react';
import { TextFieldProps } from '@mui/material';
import { MoneyFormatOutput } from '../common/formats';
import { TextFieldCustom } from './TextFieldCustom';


export const TextFieldCustomMoney = (props: TextFieldProps) => {
  return (
    <TextFieldCustom
      {...props}
      InputProps={{
        readOnly: true,
        inputComponent: MoneyFormatOutput as any,
      }}
    />
  )
};