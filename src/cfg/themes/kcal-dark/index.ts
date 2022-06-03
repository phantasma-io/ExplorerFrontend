import { ThemeOptions } from '@mui/material';
import { typography } from '../typography';
import { overrides } from '../overrides';

export const kcalDark: ThemeOptions = {
  typography,
  palette: {
    mode: 'dark',
    primary: {
      light: '#d85050',
      main: '#d02525',
      dark: '#911818',
    },
    secondary: {
      light: '#d02525',
      main: '#911818',
      dark: '#661111',
    },
    info: {
      main: '#fff',
    },
  },
  components: overrides,
};
