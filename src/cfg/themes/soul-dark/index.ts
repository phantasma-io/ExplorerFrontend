import { ThemeOptions } from '@mui/material';
import { typography } from '../typography';
import { overrides } from '../overrides';

export const soulDark: ThemeOptions = {
  typography,
  palette: {
    mode: 'dark',
    primary: {
      main: '#17b1e8', // Phantasma Blue
      contrastText: '#fff',
    },
    secondary: {
      light: '#037abd',
      main: '#025484',
      dark: '#003a5b',
    },
  },
  components: overrides,
};
