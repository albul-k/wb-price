import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
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
import Typography from '@mui/material/Typography';

import { round } from '../common/functions';

export default function TableRowCustom(props) {
    const theme = useTheme();
    const { row } = props;
    const [open, setOpen] = useState(false);

    return (
        <React.Fragment>
            <TableRow>
                <TableCell sx={{ p: 1, pl: row.details ? 0 : 4, pr: 0, borderBottom: 0 }}>
                    {row.details ? (
                        <IconButton aria-label="row" size="small" onClick={() => setOpen(!open)}>
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    ) : null}
                    <Typography variant="body1" sx={{ pl: 1, display: 'inline-flex' }}>
                        {row.name}
                    </Typography>
                </TableCell>
                <TableCell sx={{ fontStyle: 'bold', borderBottom: 0, p: 1, pl: 0, pr: 0 }}>
                    <Typography variant="body1" sx={{ textAlign: 'right' }}>
                        {row.value == '' ? '' : `${round(row.value)} ₽`}
                    </Typography>
                </TableCell>
                <TableCell sx={{ borderBottom: 0, p: 1, pl: 2, pr: 2 }}>
                    <Typography variant="body2" sx={{ fontStyle: 'italic', textAlign: 'right', color: theme.palette.secondary.main }}>
                        {row.percentage == '' ? '' : `${round(row.percentage)} %`}
                    </Typography>
                </TableCell>
            </TableRow>
            {row.details ? (
                <TableRow>
                    <TableCell sx={{ p: 0, borderBottom: 0 }} colSpan={3}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Table size="small" aria-label="details">
                                <TableBody>
                                    {row.details.map((rowDetails) => (
                                        <TableRow key={rowDetails.name}>
                                            <TableCell
                                                sx={{
                                                    pl: 7,
                                                    // paddingRight: '60px',
                                                    // textAlign: 'right',
                                                    // width: '100%',
                                                    borderBottom: 0,
                                                    fontStyle: 'italic'
                                                }}
                                            >
                                                - {rowDetails.name}
                                            </TableCell>
                                            <TableCell sx={{ borderBottom: 0, p: 1, pl: 0, pr: 0 }}>
                                                <Typography variant="body1" sx={{ textAlign: 'right' }}>
                                                    {rowDetails.value == '' ? '' : `${round(rowDetails.value)} ₽`}
                                                </Typography>
                                            </TableCell>
                                            <TableCell sx={{ borderBottom: 0, p: 1, pl: 2 }}>
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        fontStyle: 'italic',
                                                        textAlign: 'right',
                                                        color: theme.palette.secondary.main
                                                    }}
                                                >
                                                    {rowDetails.percentage == '' ? '' : `${round(rowDetails.percentage)} %`}
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
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
