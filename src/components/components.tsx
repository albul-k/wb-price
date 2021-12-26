import React from 'react';
import TextField from '@mui/material/TextField';
import { TextFieldProps } from '@mui/material';
import { MoneyFormatOutput } from './numberFormats';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';


export const TextFieldCustom = (props: TextFieldProps) => {
  return (
    <TextField
      {...props}
      size="small"
      fullWidth
    />
  )
};

export const TextFieldCustomOutput = (props: TextFieldProps) => {
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

export const HelpOutlineIconCustom = () => {
  return (
    <HelpOutlineIcon sx={{
      color: 'action.active',
      marginRight: (theme) => theme.spacing(1),
      marginY: (theme) => theme.spacing(0.5),
    }} />
  )
};