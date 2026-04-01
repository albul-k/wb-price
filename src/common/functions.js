export function round(number, precision = 0, format = false) {
    let rounded;

    if (precision <= 0) {
        rounded = Math.round(number + Number.EPSILON);
    } else {
        const multiplier = Math.pow(10, precision);
        rounded = Math.round((number + Number.EPSILON) * multiplier) / multiplier;
    }

    if (format) {
        rounded = rounded.toFixed(precision);
        return new Intl.NumberFormat('en-US', {
            minimumFractionDigits: precision <= 0 ? 0 : precision,
            maximumFractionDigits: precision <= 0 ? 0 : precision
        }).format(rounded);
    }
    return rounded;
}
