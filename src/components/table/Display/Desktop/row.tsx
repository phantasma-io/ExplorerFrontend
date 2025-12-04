import React, { useState, useCallback } from 'react';
import { Box, Grid, GridSpacing, IconButton, Tooltip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Link } from 'components/display';
import { useDarkMode, useRenderDetails, useI18n } from 'hooks';
import { routes } from 'cfg';
import { Locales } from 'types/locales';
import { TableDisplayRow, TableDisplayCol } from 'types/table';
import { DetailsValue } from 'types/components';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export interface TableRowProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  raw: any;
  index: number;
  row: TableDisplayRow;
  cols: TableDisplayCol[];
  spacing?: GridSpacing;
  hasClick?: boolean;
  openDialog: (row: TableDisplayRow, index: number) => void;
  linkOptions?: TableDisplayCol['linkOptions'];
}

export const TableRow = ({
  raw,
  index,
  cols,
  row,
  spacing,
  hasClick = false,
  openDialog,
  linkOptions,
}: TableRowProps) => {
  const { locale } = useI18n();
  const theme = useTheme();
  const { isDark } = useDarkMode();
  const renderDetails = useRenderDetails();

  const [isHover, isHoverSet] = useState<boolean>(false);

  const shouldOpenDialog = useCallback(() => {
    if (hasClick) {
      openDialog(row, index);
    }
  }, [hasClick, openDialog, row, index]);

  return (
    <Box
      py={0.81}
      onMouseEnter={() => isHoverSet(true)}
      onMouseLeave={() => isHoverSet(false)}
      style={{
        backgroundColor: isHover
          ? !isDark
            ? theme.palette.action.hover
            : theme.palette.background.paper
          : theme.palette.background.paper,
        backgroundImage:
          isDark && isHover
            ? undefined
            : `linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))`,
        cursor: hasClick ? 'pointer' : 'default',
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
      onClick={shouldOpenDialog}
    >
      <Grid container spacing={spacing} alignItems="center">
        {/* cols */}
        {row.map((cell: DetailsValue, idx) => {
          if (cols[idx].showDesktop) {
            return (
              <Grid item xs={cols[idx].size} key={`${cols[idx].label}-${cell}`}>
                <Box px={1}>
                  {renderDetails(
                    cols[idx].type,
                    cell,
                    undefined,
                    undefined,
                    true,
                  )}
                </Box>
              </Grid>
            );
          }
          return null;
        })}

        {/* actions */}
        <Grid item xs={1}>
          <Box>
            <Grid
              container
              spacing={1}
              justifyContent="center"
              alignItems="center"
            >
              {linkOptions && (
                <Grid item>
                  <Link
                    href={routes[linkOptions.route](locale as Locales, {
                      id: raw[linkOptions.key],
                    })}
                  >
                    <Tooltip title={linkOptions.title} placement="top">
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        color="primary"
                      >
                        <ArrowForwardIosIcon
                          style={{
                            height: '15px',
                            width: 'auto',
                          }}
                        />
                      </IconButton>
                    </Tooltip>
                  </Link>
                </Grid>
              )}
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
