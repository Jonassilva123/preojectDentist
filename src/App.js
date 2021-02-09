import 'react-perfect-scrollbar/dist/css/styles.css';
import React from 'react';
import { ThemeProvider, createMuiTheme, colors } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import Routes from 'src/routes';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useAuth } from 'src/context/AuthContext';
import typography from './theme/typography';
import shadows from './theme/shadows';

const App = () => {
  const { currentUserTheme } = useAuth();
  const prefersDarkMode = useMediaQuery(
    `(prefers-color-scheme: ${currentUserTheme})`
  );

  console.log(currentUserTheme);

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
          primary: {
            main: '#009cea'
          },
          secondary: {
            main: colors.blueGrey[100]
          }
        },
        shadows,
        typography
      }),
    [prefersDarkMode]
  );
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Routes />
    </ThemeProvider>
  );
};

export default App;
