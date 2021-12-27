import React from 'react';
import TextField from '@mui/material/TextField';
import { TextFieldProps } from '@mui/material';


export const TextFieldCustom = (props: TextFieldProps) => {
  return (
    <TextField
      {...props}
      size="small"
      fullWidth
    />
  )
};