import { ThemeOptions } from '@mui/material';
import { typography } from '../typography';
import { overrides } from '../overrides';

export const kcal: ThemeOptions = {
  typography,
  palette: {
    primary: {
      light: '#d85050',
      main: '#d02525',
      dark: '#911818',
    },
    secondary: {
      light: '#d85050',
      main: '#d02525',
      dark: '#911818',
    },
    info: {
      main: '#fff',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  components: overrides,
};
