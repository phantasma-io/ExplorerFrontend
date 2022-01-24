import { ThemeOptions } from '@mui/material';
import { typography } from '../typography';
import { overrides } from '../overrides';

export const soul: ThemeOptions = {
  typography,
  palette: {
    primary: {
      main: '#17b1e8', // Phantasma Blue
      contrastText: '#fff',
    },
    secondary: {
      light: '#3492c9',
      main: '#037abd',
      dark: '#025484',
    },
  },
  components: overrides,
};
