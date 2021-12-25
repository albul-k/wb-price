import React from 'react';
// @ts-ignore
import NumberFormat from 'react-number-format';


interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
};

export const MoneyFormatInput = React.forwardRef<NumberFormat, CustomProps>(
  function MoneyFormat(props, ref) {
    const { onChange, ...other } = props;

    return (
      <NumberFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values: any) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        allowNegative={false}
        thousandSeparator
        isNumericString
        prefix="₽ "
      />
    );
  },
);

export const MoneyFormatOutput = React.forwardRef<NumberFormat, CustomProps>(
  function MoneyFormat(props, ref) {
    const { onChange, ...other } = props;

    return (
      <NumberFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values: any) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        allowNegative={true}
        thousandSeparator
        isNumericString
        prefix="₽ "
      />
    );
  },
);

export const PercentFormat = React.forwardRef<NumberFormat, CustomProps>(
  function MoneyFormat(props, ref) {
    const { onChange, ...other } = props;

    return (
      <NumberFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values: any) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        isAllowed={
          ({ value = 0 }) => value <= 100
        }
        allowNegative={false}
        // isNumericString
        suffix=" %"
      />
    );
  },
);