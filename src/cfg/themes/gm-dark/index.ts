import { ThemeOptions } from '@mui/material';
import { typography } from '../typography';
import { overrides } from '../overrides';

export const gmDark: ThemeOptions = {
  typography,
  palette: {
    mode: 'dark',
    primary: {
      light: '#00b2ec',
      main: '#0076b9',
      dark: '#0060B9',
    },
    secondary: {
      light: '#0076b9',
      main: '#0060B9',
    },
  },
  components: overrides,
};
