import React from 'react';
import Grid from '@mui/material/Grid';

export const GridCustom = (props) => {
    return <Grid container rowSpacing={1.5} spacing={3} {...props}></Grid>;
};
