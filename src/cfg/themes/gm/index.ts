import { ThemeOptions } from '@mui/material';
import { typography } from '../typography';
import { overrides } from '../overrides';

export const gm: ThemeOptions = {
  typography,
  palette: {
    primary: {
      light: '#00b2ec',
      main: '#0076b9',
      dark: '#0060B9',
    },
    secondary: {
      light: '#00b2ec',
      main: '#0076b9',
      dark: '#0060B9',
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
