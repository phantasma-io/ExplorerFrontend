import { ThemeOptions } from '@mui/material';
import { typography } from '../typography';
import { overrides } from '../overrides';

export const soulDark: ThemeOptions = {
  typography,
  palette: {
    mode: 'dark',
    primary: {
      light: '#037abd',
      main: '#025484',
      dark: '#003a5b',
    },
    secondary: {
      main: '#037abd',
    },
  },
  components: overrides,
};
