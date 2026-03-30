import React from 'react';
import Card from '@mui/material/Card';

export const CardCustom = (props) => {
    return <Card sx={{ marginBottom: (theme) => theme.spacing(3), boxShadow: 0, borderRadius: 3 }} {...props}></Card>;
};
