import { forwardRef } from 'react';
import NumberFormat from 'react-number-format';

// interface CustomProps {
//   onChange: (event: { target: { name: string; value: string } }) => void;
//   name: string;
// };

export const MoneyFormatInput = forwardRef(function MoneyFormatInput(props, ref) {
    // eslint-disable-next-line react/prop-types
    const { onChange, ...other } = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={ref}
            onValueChange={(values) => {
                onChange({
                    target: {
                        // eslint-disable-next-line react/prop-types
                        name: props.name,
                        value: values.value
                    }
                });
            }}
            allowNegative={false}
            thousandSeparator
            isNumericString
            prefix="₽ "
        />
    );
});

export const MoneyFormatOutput = forwardRef(function MoneyFormatOutput(props, ref) {
    // eslint-disable-next-line react/prop-types
    const { onChange, ...other } = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={ref}
            onValueChange={(values) => {
                onChange({
                    target: {
                        // eslint-disable-next-line react/prop-types
                        name: props.name,
                        value: values.value
                    }
                });
            }}
            allowNegative={true}
            thousandSeparator
            isNumericString
            prefix="₽ "
        />
    );
});

export const PercentFormat = forwardRef(function PercentFormat(props, ref) {
    // eslint-disable-next-line react/prop-types
    const { onChange, ...other } = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={ref}
            onValueChange={(values) => {
                onChange({
                    target: {
                        // eslint-disable-next-line react/prop-types
                        name: props.name,
                        value: values.value
                    }
                });
            }}
            isAllowed={({ value = 0 }) => value <= 100}
            allowNegative={false}
            // isNumericString
            suffix=" %"
        />
    );
});
