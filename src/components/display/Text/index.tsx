import React, { useMemo } from 'react';
import { useSnackbar } from 'notistack';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import {
  Typography,
  TypographyProps,
  Grid,
  GridSpacing,
  IconButton,
  Tooltip,
} from '@mui/material';
import { useEcho } from '@ricardo-jrm/echo';
import { useFury } from '@ricardo-jrm/fury';
import {
  numberFormat,
  dateFormat,
  dateRelative,
  stringCapitalize,
  stringTruncate,
} from '@ricardo-jrm/dervish';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EventIcon from '@mui/icons-material/Event';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { NUMBER_FORMAT, DATE_FORMAT } from 'cfg';
import { Link } from '../Link';

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
  formatNumber?: number;
  formatNumberStr?: string;
  /**
   * Formats given `Date`
   */
  formatDate?: Date;
  formatDateStr?: string;
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
  linkOptions?: {
    link: string;
    title: string;
  };
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
  spacing = 0,
  label,
  clipboard,
  variant = 'body1',
  truncate,
  capitalize,
  sx,
  wordBreak = 'normal',
  monospace,
  linkOptions,
  ...propsTypo
}: TextProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const { furyActive } = useFury();
  const { echo } = useEcho();

  const copy: string = useMemo(() => {
    if (formatDate) {
      return dateFormat(formatDate, formatDateStr);
    }

    if (formatNumber) {
      return numberFormat(formatNumber, formatNumberStr);
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
  ]);

  const result = useMemo(() => {
    let strDisplay = `${copy}`;

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
  }, [variant, propsTypo, copy, truncate, sx, wordBreak, monospace]);

  return (
    <Grid
      container
      spacing={spacing}
      alignItems="center"
      justifyContent={justify}
      sx={{ width: '100%' }}
    >
      {label && (
        <Grid item>
          <Typography variant={variant} {...propsTypo} sx={sx}>
            <b>{translate ? echo(label) : label}:</b>
          </Typography>
        </Grid>
      )}
      <Grid item>{children || result}</Grid>
      {formatDate && (
        <Grid item>
          <Tooltip title={dateRelative(formatDate).fromNow} placement="right">
            <Typography variant={variant} {...propsTypo} sx={sx}>
              <CopyToClipboard text={copy}>
                <IconButton
                  size="small"
                  onClick={(e) => {
                    enqueueSnackbar(echo('copied-to-clipboard'));
                    e.stopPropagation();
                  }}
                >
                  <EventIcon
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
          <Link href={linkOptions.link} title={linkOptions.title}>
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
