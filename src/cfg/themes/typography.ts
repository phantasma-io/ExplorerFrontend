import { ThemeOptions, createTheme } from '@mui/material';

const { breakpoints } = createTheme();

export const typography: ThemeOptions['typography'] = {
  fontFamily: [
    'IBM Plex Sans',
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
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
    fontWeight: 600,
    fontSize: '69px',
    lineHeight: '69px',
    [breakpoints.down('sm')]: {
      fontSize: '66px',
      lineHeight: '66px',
    },
  },
  h2: {
    fontWeight: 600,
    fontSize: '60px',
    lineHeight: '60px',
    [breakpoints.down('sm')]: {
      fontSize: '45px',
      lineHeight: '45px',
    },
  },
  h3: {
    fontWeight: 600,
    fontSize: '45px',
    lineHeight: '45px',
    [breakpoints.down('sm')]: {
      fontSize: '36px',
      lineHeight: '36px',
    },
  },
  h4: {
    fontWeight: 600,
    fontSize: '39px',
    lineHeight: '39px',
    [breakpoints.down('sm')]: {
      fontSize: '30px',
      lineHeight: '30px',
    },
  },
  h5: {
    fontWeight: 600,
    fontSize: '30px',
    lineHeight: '30px',
    [breakpoints.down('sm')]: {
      fontSize: '27px',
      lineHeight: '27px',
    },
  },
  h6: {
    fontWeight: 600,
    fontSize: '24px',
    lineHeight: '24px',
    [breakpoints.down('sm')]: {
      fontSize: '21px',
      lineHeight: '21px',
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
      fontSize: '15px',
      lineHeight: '15px',
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
