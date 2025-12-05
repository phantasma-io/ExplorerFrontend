import React, { useMemo } from 'react';
import { useSnackbar } from 'notistack';
import bigint from 'bigintjs';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import {
  Box,
  Typography,
  TypographyProps,
  Grid,
  GridSpacing,
  IconButton,
  Tooltip,
} from '@mui/material';
import { useEcho } from '@ricardojrmcom/echo';
import { useFury } from '@ricardojrmcom/fury';
import {
  numberFormat,
  stringCapitalize,
  stringTruncate,
} from '@ricardojrmcom/dervish';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EventIcon from '@mui/icons-material/Event';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { NUMBER_FORMAT, DATE_FORMAT } from 'cfg';
import { useDarkMode } from 'hooks';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';

import { useDatetimeOpts } from 'hooks/datetime/useDatetimeOpts';

import { Link } from '../Link';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(advancedFormat);
dayjs.extend(relativeTime);

/**
 * Text props
 */
export interface TextProps
  extends Omit<TypographyProps, 'translate' | 'variant'> {
  /**
   * Value
   */
  value?: string;
  /**
   * Justify
   */
  justify?: 'start' | 'center' | 'end';
  /**
   * Typography variant
   */
  variant?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'subtitle1'
    | 'subtitle2'
    | 'body1'
    | 'body2'
    | 'caption'
    | 'button'
    | 'overline';
  /**
   * Translates using `children: string` as ID
   */
  translate?: boolean;
  /**
   * Formats `children: number` with commas
   */
  formatNumber?: number | string;
  formatNumberStr?: string;
  /**
   * Formats given `Date`
   */
  formatDate?: Date;
  formatDateStr?: string;
  formatDateIcon?: boolean;
  /**
   * Spacing between elements
   */
  spacing?: GridSpacing;
  /**
   * Adds label element, translated if `translate: true`
   */
  label?: string;
  /**
   * Adds clipboard element
   */
  clipboard?: boolean;
  /**
   * Truncate text options
   */
  truncate?: {
    len: number;
    keepLastWord?: boolean;
  };
  /**
   * Capitalize text options
   */
  capitalize?: boolean | 'allWords';
  wordBreak?: 'normal' | 'break-all' | 'keep-all' | 'break-word';
  monospace?: boolean;
  script?: boolean;
  linkOptions?: {
    link: string;
    title: string;
  };
  append?: string;
}

/**
 * Text
 */
export const Text = ({
  children,
  value,
  justify = 'start',
  translate,
  formatNumber,
  formatNumberStr = NUMBER_FORMAT,
  formatDate,
  formatDateStr = DATE_FORMAT,
  formatDateIcon,
  spacing = 0,
  label,
  clipboard,
  variant = 'body1',
  truncate,
  capitalize,
  sx,
  wordBreak = 'normal',
  monospace,
  script,
  linkOptions,
  height,
  append,
  ...propsTypo
}: TextProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const { furyActive } = useFury();
  const { echo } = useEcho();
  const { isDark } = useDarkMode();
  const { dtOpts } = useDatetimeOpts();

  const copy: string = useMemo(() => {
    if (formatDate) {
      if(formatDateIcon) {
        switch (dtOpts) {
          case 'utc':
            return `${dayjs(formatDate).fromNow()} (${dayjs(formatDate).utc().format(formatDateStr)})`;
          case 'utc-24':
            return `${dayjs(formatDate).fromNow()} (${dayjs(formatDate).utc().format(formatDateStr)})`;
          default:
            return `${dayjs(formatDate).fromNow()} (${dayjs(formatDate).format(formatDateStr)})`;
        }
      }
      else {
        switch (dtOpts) {
          case 'utc':
            return dayjs(formatDate).utc().format(formatDateStr);
          case 'utc-24':
            return dayjs(formatDate).utc().format(formatDateStr);
          default:
            return dayjs(formatDate).format(formatDateStr);
        }
      }
    }

    if (formatNumber !== undefined && formatNumber !== null) {
      if (Number(formatNumber) === formatNumber && formatNumber % 1 !== 0) {
        return formatNumber;
      }

      const bigNumber = bigint(formatNumber);
      const formattedNumber = numberFormat(
        parseFloat(formatNumber as string),
        formatNumberStr,
      );
      if (Number.isNaN(formattedNumber) || formattedNumber === 'NaN') {
        return bigNumber.toString();
      }

      return formattedNumber;
    }

    if (translate) {
      if (capitalize) {
        return stringCapitalize(echo(`${value}`), capitalize === 'allWords');
      }
      return echo(`${value}`);
    }

    if (capitalize) {
      return stringCapitalize(`${value}`, capitalize === 'allWords');
    }

    return `${value}`;
  }, [
    formatDate,
    formatNumber,
    formatDateStr,
    formatNumberStr,
    value,
    translate,
    echo,
    capitalize,
    dtOpts,
    formatDateIcon,
  ]);

  const result = useMemo(() => {
    // eslint-disable-next-line no-unneeded-ternary
    let strDisplay = `${copy}${append ? append : ''}`;

    if (truncate) {
      strDisplay = stringTruncate(copy, truncate.len, truncate.keepLastWord);
    }

    return (
      <Typography
        variant={variant}
        {...propsTypo}
        sx={sx}
        style={
          monospace ? { wordBreak, fontFamily: 'monospace' } : { wordBreak }
        }
      >
        {strDisplay}
      </Typography>
    );
  }, [variant, propsTypo, copy, truncate, sx, wordBreak, monospace, append]);

  return (
    <Grid
      container
      spacing={spacing}
      alignItems="center"
      justifyContent={justify}
      sx={{ width: '100%', minHeight: height }}
    >
      {label && (
        <Grid item>
          <Typography variant={variant} {...propsTypo} sx={sx}>
            <b>{translate ? echo(label) : label}:</b>
          </Typography>
        </Grid>
      )}
      {script ? (
        <Grid item>
          <Box
            p={0.5}
            sx={{
              borderRadius: '3px',
              backgroundColor: isDark ? '#3a3a3a' : '#e5e5e5',
              maxHeight: '300px',
              overflowY: 'auto',
            }}
          >
            {children || result}
          </Box>
        </Grid>
      ) : (
        <Grid item>{children || result}</Grid>
      )}
      {clipboard && (
        <Grid item>
          <Tooltip title={echo('copy-to-clipboard')} placement="right">
            <Typography variant={variant} {...propsTypo} sx={sx}>
              <CopyToClipboard text={copy}>
                <IconButton
                  size="small"
                  onClick={(e) => {
                    enqueueSnackbar(echo('copied-to-clipboard'));
                    e.stopPropagation();
                  }}
                >
                  <ContentCopyIcon
                    style={{
                      fontSize: furyActive.typography[variant].fontSize,
                      opacity: 0.45,
                    }}
                  />
                </IconButton>
              </CopyToClipboard>
            </Typography>
          </Tooltip>
        </Grid>
      )}
      {linkOptions && (
        <Grid item>
          <Link href={linkOptions.link}>
            <Tooltip title={linkOptions.title} placement="right">
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                }}
                color="primary"
              >
                <ArrowForwardIosIcon
                  style={{
                    fontSize: furyActive.typography[variant].fontSize,
                    width: 'auto',
                  }}
                />
              </IconButton>
            </Tooltip>
          </Link>
        </Grid>
      )}
    </Grid>
  );
};
