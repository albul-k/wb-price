import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { TextFieldCustomMoney } from './TextFieldCustomMoney';
import { TextFieldCustomPercentage } from './TextFieldCustomPercentage';
import { round } from '../common/functions';

export default function TableRowCustom(props) {
    const { row } = props;
    const [open, setOpen] = useState(false);

    return (
        <React.Fragment>
            <TableRow>
                <TableCell component="th" scope="row" sx={{ paddingLeft: row.details ? 0 : '28px', borderBottom: 0 }}>
                    {row.details ? (
                        <IconButton aria-label="row" size="small" onClick={() => setOpen(!open)}>
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    ) : null}
                    {row.name}
                </TableCell>
                <TableCell sx={{ borderBottom: 0, paddingRight: 0 }}>
                    <TextFieldCustomMoney value={row.value == '' ? '' : round(row.value)} variant="standard" />
                </TableCell>
                <TableCell sx={{ borderBottom: 0, paddingRight: '16px', paddingLeft: 0 }}>
                    <TextFieldCustomPercentage value={row.percentage == '' ? '' : round(row.percentage)} variant="standard" />
                </TableCell>
            </TableRow>
            {row.details ? (
                <TableRow>
                    <TableCell sx={{ paddingBottom: 0, paddingTop: 0, borderBottom: 0 }} colSpan={6}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box sx={{ margin: 1 }}>
                                <Table size="small" aria-label="details">
                                    <TableBody>
                                        {row.details.map((rowDetails) => (
                                            <TableRow key={rowDetails.name}>
                                                <TableCell
                                                    component="th"
                                                    scope="row"
                                                    sx={{
                                                        paddingLeft: '8px',
                                                        textAlign: 'right',
                                                        width: '50%',
                                                        borderBottom: 0,
                                                        fontStyle: 'italic'
                                                    }}
                                                >
                                                    {rowDetails.name}
                                                </TableCell>
                                                <TableCell sx={{ borderBottom: 0 }}>
                                                    <TextFieldCustomMoney
                                                        value={rowDetails.value == '' ? '' : round(rowDetails.value)}
                                                        variant="standard"
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            ) : null}
        </React.Fragment>
    );
}

TableRowCustom.propTypes = {
    row: PropTypes.shape({
        name: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
        percentage: PropTypes.number.isRequired,
        details: PropTypes.arrayOf(
            PropTypes.shape({
                key: PropTypes.string.isRequired,
                name: PropTypes.string.isRequired,
                value: PropTypes.number.isRequired
            })
        )
    }).isRequired
};
