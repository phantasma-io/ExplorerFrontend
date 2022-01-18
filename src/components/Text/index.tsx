import React, { useMemo } from 'react';
import { useSnackbar } from 'notistack';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Typography, { TypographyProps } from '@mui/material/Typography';
import Grid, { GridSpacing } from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
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

/**
 * Text props
 */
export interface TextProps
  extends Omit<TypographyProps, 'translate' | 'variant' | 'children'> {
  /**
   * Children
   */
  children?: string | number;
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
  formatNumber?: boolean;
  /**
   * Formats given `Date`
   */
  formatDate?: Date;
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
}

/**
 * Text
 */
export const Text = ({
  children,
  translate,
  formatNumber,
  formatDate,
  spacing = 0,
  label,
  clipboard,
  variant = 'body1',
  truncate,
  capitalize,
  sx,
  ...propsTypo
}: TextProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const { furyActive } = useFury();
  const { echo } = useEcho();

  const copy: string = useMemo(() => {
    if (formatDate) {
      return dateFormat(formatDate);
    }

    if (formatNumber) {
      return numberFormat(children as number);
    }

    if (translate) {
      if (capitalize) {
        return stringCapitalize(
          echo(children as string),
          capitalize === 'allWords',
        );
      }
      return echo(children as string);
    }

    if (capitalize) {
      return stringCapitalize(`${children}`, capitalize === 'allWords');
    }

    return `${children}`;
  }, [formatDate, formatNumber, children, translate, echo, capitalize]);

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
        style={{ wordBreak: 'break-all' }}
      >
        {strDisplay}
      </Typography>
    );
  }, [variant, propsTypo, copy, truncate, sx]);

  return (
    <Grid
      container
      spacing={spacing}
      alignItems="center"
      sx={{ width: '100%' }}
    >
      {label && (
        <Grid item>
          <Typography variant={variant} {...propsTypo} sx={sx}>
            <b>{translate ? echo(label) : label}:</b>
          </Typography>
        </Grid>
      )}
      <Grid item>{result}</Grid>
      {formatDate && (
        <Grid item>
          <Tooltip title={dateRelative(formatDate).fromNow}>
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
          <Tooltip title={echo('copy-to-clipboard')}>
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
                    }}
                  />
                </IconButton>
              </CopyToClipboard>
            </Typography>
          </Tooltip>
        </Grid>
      )}
    </Grid>
  );
};
