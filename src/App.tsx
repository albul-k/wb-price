import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { DefaultTheme, makeStyles, useTheme } from '@mui/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Copyright from './views/Copyright';
import Main from './views/Main';


const theme = createTheme();
const useStyles = makeStyles((theme: DefaultTheme) => ({
  root: {},
  contentHeader: {
    marginBottom: '32px'
  },
  // button: {
  //   color: "white",
  //   [theme.breakpoints.down("xs")]: {
  //     marginTop: theme.spacing(1),
  //     backgroundColor: "purple"
  //   },
  //   [theme.breakpoints.between("sm", "md")]: {
  //     marginTop: theme.spacing(3),
  //     backgroundColor: "blue"
  //   },
  //   "@media (min-width: 1280px)": {
  //     marginTop: theme.spacing(5),
  //     backgroundColor: "red"
  //   }
  // }
}));


function App() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
          }}
        >
          <CssBaseline />
          <Container component="main" sx={{ mt: 2, mb: 2 }} maxWidth="lg">
            <Box className={classes.contentHeader}>
              <Typography variant="h4" align="center">
                Калькулятор цены товара на Wildberries
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
    </React.Fragment>
  );
};

export default App;
