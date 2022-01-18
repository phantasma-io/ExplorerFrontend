import { ThemeOptions } from '@mui/material';
import { typography } from '../typography';
import { overrides } from '../overrides';

export const kcalDark: ThemeOptions = {
  typography,
  palette: {
    mode: 'dark',
    primary: {
      light: '#d02525',
      main: '#911818',
      dark: '#661111',
    },
    secondary: {
      main: '#d02525',
    },
  },
  components: overrides,
};
