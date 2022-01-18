import { ThemeOptions, createTheme } from '@mui/material';

const { breakpoints } = createTheme();

export const typography: ThemeOptions['typography'] = {
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    'Radiance',
    'Radiance-Black',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
    '"Radiance-Distressed"',
  ].join(','),
  h1: {
    fontSize: '60px',
    lineHeight: '60px',
    fontWeight: 600,
    [breakpoints.down('sm')]: {
      fontSize: '30px',
      lineHeight: '30px',
    },
  },
  h2: {
    fontWeight: 600,
  },
  h3: {
    fontWeight: 600,
    fontSize: '45px',
    lineHeight: '45px',
    [breakpoints.down('sm')]: {
      fontSize: '25px',
      lineHeight: '25px',
    },
  },
  h4: {
    fontWeight: 600,
    fontSize: '30px',
    lineHeight: '30px',
    [breakpoints.down('sm')]: {
      fontSize: '21px',
      lineHeight: '21px',
    },
  },
  h5: {
    fontWeight: 600,
  },
  h6: {
    fontWeight: 600,
  },
  // subtitle1: {},
  // subtitle2: {},
  // body1: {},
  // body2: {},
  button: {
    textTransform: 'none',
    fontWeight: 600,
  },
  // caption: {},
  // overline: {},
};
