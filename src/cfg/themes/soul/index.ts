import { ThemeOptions } from '@mui/material';
import { typography } from '../typography';
import { overrides } from '../overrides';

export const soul: ThemeOptions = {
  typography,
  palette: {
    primary: {
      light: 'rgb(69, 192, 236)',
      main: '#17b1e8', // Phantasma Blue
      dark: 'rgb(16, 123, 162)',
      contrastText: '#fff',
    },
    secondary: {
      light: 'rgb(69, 192, 236)',
      main: '#17b1e8', // Phantasma Blue
      dark: 'rgb(16, 123, 162)',
      contrastText: '#fff',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  components: overrides,
};
