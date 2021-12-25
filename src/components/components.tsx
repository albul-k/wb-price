import React from 'react';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Slider from '@mui/material/Slider';
import Divider from '@mui/material/Divider';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { TextFieldProps, SliderProps, DividerProps, TooltipProps } from '@mui/material';
import { MoneyFormatOutput } from './numberFormats';

export const TextFieldCustom = (props: TextFieldProps) => {
  return (
    <TextField
      {...props}
      color="secondary"
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

export const SliderCustom = (props: SliderProps) => {
  const marks = [
    { value: 0, label: '0%' },
    { value: 20, label: '20%' },
    { value: 40, label: '40%' },
    { value: 60, label: '60%' },
    { value: 80, label: '80%' },
    { value: 100, label: '100%' },
  ];

  return (
    <Slider
      {...props}
      marks={marks}
      sx={{
        marginTop: '8px',
        marginBottom: '8px',
      }}
      size='small'
      step={1}
      min={0}
      max={100}
      valueLabelDisplay="auto"
      color="secondary"
    />
  )
};

export const DividerCustom = (props: DividerProps) => {
  return (
    <Divider
      {...props}
      sx={{
        marginTop: '40px',
        marginBottom: '40px',
      }}
    />
  )
};

export const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}));