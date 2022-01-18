import { ThemeOptions } from '@mui/material';
import { typography } from '../typography';
import { overrides } from '../overrides';

export const soul: ThemeOptions = {
  typography,
  palette: {
    primary: {
      light: '#3492c9',
      main: '#037abd',
      dark: '#025484',
    },
    secondary: {
      main: '#037abd',
    },
  },
  components: overrides,
};
