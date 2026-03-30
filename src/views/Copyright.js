import React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import GitHubIcon from '@mui/icons-material/GitHub';

function Copyright() {
    return (
        <Typography
            variant="body2"
            align="center"
            sx={{
                color: (theme) => theme.palette.primary.light
            }}
        >
            {'Copyright © '}
            <Link color="inherit" href="https://github.com/albul-k/wb-price" target="_blank">
                <GitHubIcon />
                albul-k
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function StickyFooter() {
    return (
        <Box
            component="footer"
            sx={{
                py: 1,
                mt: 'auto',
                backgroundColor: (theme) => theme.palette.secondary.dark
            }}
        >
            <Copyright />
        </Box>
    );
}
