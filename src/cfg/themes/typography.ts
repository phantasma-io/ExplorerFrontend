import { ThemeOptions, createTheme } from '@mui/material';

const { breakpoints } = createTheme();

export const typography: ThemeOptions['typography'] = {
  fontFamily: [
    'IBM Plex Sans',
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  h1: {
    fontWeight: 600,
    fontSize: '48px',
    lineHeight: '48px',
    [breakpoints.down('sm')]: {
      fontSize: '27px',
      lineHeight: '27px',
    },
  },
  h2: {
    fontWeight: 600,
    fontSize: '45px',
    lineHeight: '45px',
    [breakpoints.down('sm')]: {
      fontSize: '26px',
      lineHeight: '26px',
    },
  },
  h3: {
    fontWeight: 600,
    fontSize: '42px',
    lineHeight: '42px',
    [breakpoints.down('sm')]: {
      fontSize: '25px',
      lineHeight: '25px',
    },
  },
  h4: {
    fontWeight: 600,
    fontSize: '36px',
    lineHeight: '36px',
    [breakpoints.down('sm')]: {
      fontSize: '24px',
      lineHeight: '24px',
    },
  },
  h5: {
    fontWeight: 600,
    fontSize: '30px',
    lineHeight: '30px',
    [breakpoints.down('sm')]: {
      fontSize: '20px',
      lineHeight: '20px',
    },
  },
  h6: {
    fontWeight: 600,
    fontSize: '24px',
    lineHeight: '24px',
    [breakpoints.down('sm')]: {
      fontSize: '19px',
      lineHeight: '19px',
    },
  },
  subtitle1: {
    fontWeight: 600,
    fontSize: '21px',
    lineHeight: '21px',
    [breakpoints.down('sm')]: {
      fontSize: '18px',
      lineHeight: '18px',
    },
  },
  subtitle2: {
    fontWeight: 600,
    fontSize: '18px',
    lineHeight: '18px',
    [breakpoints.down('sm')]: {
      fontSize: '17px',
      lineHeight: '17px',
    },
  },
  body1: {
    fontSize: '16px',
    lineHeight: '16px',
    [breakpoints.down('sm')]: {
      fontSize: '15px',
      lineHeight: '15px',
    },
  },
  body2: {
    fontSize: '14px',
    lineHeight: '14px',
    [breakpoints.down('sm')]: {
      fontSize: '13px',
      lineHeight: '13px',
    },
  },
  button: {
    textTransform: 'none',
    fontWeight: 600,
  },
  caption: {
    fontSize: '12px',
    lineHeight: '12px',
  },
};
