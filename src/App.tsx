import React from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import { green, purple } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import Copyright from './views/Copyright';
import Main from './views/Main';


const theme = createTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: green[500],
    },
  },
});


function App() {
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh'
        }}>
          <CssBaseline />
          <Container component="main" sx={{
            marginBottom: theme.spacing(4),
            [theme.breakpoints.down("lg")]: {
              paddingX: theme.spacing(2)
            },
          }}>
            <Box sx={{
              marginY: theme.spacing(4),
              color: theme.palette.primary.main
            }}>
              <Typography variant="h4" align="center">
                {'Анализ цены товара на Wildberries'}
              </Typography>
            </Box>
            <Grid container spacing={12}>
              <Grid item xs={12}>
                <Main />
              </Grid>
            </Grid>
          </Container>
          <Copyright />
        </Box>
      </ThemeProvider>
    </React.Fragment >
  );
};

export default App;
