import { ThemeOptions } from '@mui/material';
import { typography } from '../typography';
import { overrides } from '../overrides';

export const soulDark: ThemeOptions = {
  typography,
  palette: {
    mode: 'dark',
    primary: {
      main: '#17b1e8',
      contrastText: '#fff',
    },
    secondary: {
      dark: 'rgb(11, 86, 113)',
      light: 'rgb(63, 149, 180)',
      main: 'rgb(16, 123, 162)',
      contrastText: '#fff',
    },
    info: {
      main: '#fff',
    },
  },
  components: overrides,
};
