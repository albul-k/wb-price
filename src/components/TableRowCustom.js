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
import Tooltip from '@mui/material/Tooltip';

import { round } from '../common/functions';

export default function TableRowCustom(props) {
    const theme = useTheme();
    const { row } = props;
    const [open, setOpen] = useState(false);

    return (
        <React.Fragment>
            <TableRow>
                <TableCell sx={{ p: 1, pl: row.details ? 1 : 5, pr: 0, borderBottom: 0 }}>
                    {row.details ? (
                        <IconButton aria-label="row" size="small" onClick={() => setOpen(!open)}>
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    ) : null}
                    <Typography
                        variant="body1"
                        sx={{
                            pl: 1,
                            display: 'inline-flex',
                            fontWeight: () => (row.fontWeight ? row.fontWeight : 'normal'),
                            color: () => (row.color ? row.color : 'inherit')
                        }}
                    >
                        {row.name}
                    </Typography>
                </TableCell>
                <TableCell sx={{ borderBottom: 0, p: 1, pl: 0, pr: 0 }}>
                    <Typography
                        variant="body1"
                        sx={{
                            textAlign: 'right',
                            width: '100px',
                            fontWeight: () => (row.fontWeight ? row.fontWeight : 'normal'),
                            color: () => (row.color ? row.color : 'inherit')
                        }}
                    >
                        {row.value == '' ? '' : `${round(row.value, 0, true)} ₽`}
                    </Typography>
                </TableCell>
                <TableCell sx={{ borderBottom: 0, p: 1, pl: 2, pr: 2 }}>
                    <Tooltip title="% от цены до СПП" placement="bottom">
                        <Typography
                            variant="body2"
                            sx={{
                                fontStyle: 'italic',
                                textAlign: 'right',
                                color: theme.palette.secondary.main,
                                width: '48px',
                                fontWeight: () => (row.fontWeight ? row.fontWeight : 'normal'),
                                color: () => (row.color ? row.color : 'inherit')
                            }}
                        >
                            {row.percentage == '' ? '' : `${round(row.percentage, 1)} %`}
                        </Typography>
                    </Tooltip>
                </TableCell>
            </TableRow>
            {row.details ? (
                <TableRow>
                    <TableCell sx={{ p: 0, borderBottom: 0 }} colSpan={3}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Table aria-label="details">
                                <TableBody>
                                    {row.details.map((rowDetails) => (
                                        <TableRow key={rowDetails.name}>
                                            <TableCell
                                                sx={{
                                                    p: 0,
                                                    pl: 7,
                                                    // paddingRight: '60px',
                                                    // textAlign: 'right',
                                                    // width: '100%',
                                                    borderBottom: 0,
                                                    fontStyle: 'italic'
                                                }}
                                            >
                                                {rowDetails.name}
                                            </TableCell>
                                            <TableCell sx={{ borderBottom: 0, p: 1, pl: 0, pr: 0, width: '100px' }}>
                                                <Typography variant="body1" sx={{ textAlign: 'right' }}>
                                                    {rowDetails.value == '' ? '' : `${round(rowDetails.value, 0, true)} ₽`}
                                                </Typography>
                                            </TableCell>
                                            <TableCell sx={{ borderBottom: 0, p: 1, pl: 2, pr: 2, width: '80px' }}>
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        fontStyle: 'italic',
                                                        textAlign: 'right',
                                                        color: theme.palette.secondary.main
                                                    }}
                                                >
                                                    {rowDetails.percentage == '' ? '' : `${round(rowDetails.percentage, 1)} %`}
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
                value: PropTypes.number.isRequired,
                percentage: PropTypes.number.isRequired
            })
        ),
        fontWeight: PropTypes.string,
        color: PropTypes.any
    }).isRequired
};
