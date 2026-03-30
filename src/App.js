import React from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import { grey, purple } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import ButtonGroup from '@mui/material/ButtonGroup';
import Stack from '@mui/material/Stack';
import { IconBrandVk, IconBrandTelegram, IconAt } from '@tabler/icons';

import Copyright from './views/Copyright';
import Main from './views/Main';
import logo from './assets/images/logo.png';

const theme = createTheme({
    palette: {
        primary: {
            main: purple[700],
            light: grey[200]
        },
        secondary: {
            main: grey[700],
            light: grey[300]
        }
    },
    typography: {
        fontSize: 12
    }
});

function App() {
    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        minHeight: '100vh',
                        height: 'calc(100% - 200px)',
                        backgroundColor: theme.palette.primary.light
                    }}
                >
                    <CssBaseline />
                    <Container
                        component="main"
                        sx={{
                            [theme.breakpoints.down('lg')]: {
                                paddingX: theme.spacing(3)
                            }
                        }}
                    >
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Stack
                                    direction="row"
                                    sx={{ m: 1, marginY: theme.spacing(3), color: theme.palette.secondary.dark, alignItems: 'center' }}
                                    justifyContent="space-between"
                                >
                                    <Link color="inherit" href="https://t.me/wb_fin" target="_blank">
                                        <Box component="img" src={logo} sx={{ width: 100 }}></Box>
                                    </Link>
                                    <ButtonGroup aria-label="outlined primary button group" size="large">
                                        <Link href="https://t.me/wb_fin" target="_blank" sx={{ marginLeft: 1, marginRight: 1 }}>
                                            <IconBrandTelegram />
                                        </Link>
                                        <Link href="https://vk.com/wb_fin" target="_blank" sx={{ marginLeft: 1, marginRight: 1 }}>
                                            <IconBrandVk />
                                        </Link>
                                        <Link href="https://wbfin.org/" target="_blank" sx={{ marginLeft: 1, marginRight: 1 }}>
                                            <IconAt />
                                        </Link>
                                    </ButtonGroup>
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Main />
                            </Grid>
                        </Grid>
                    </Container>
                    <Copyright />
                </Box>
            </ThemeProvider>
        </>
    );
}

export default App;
