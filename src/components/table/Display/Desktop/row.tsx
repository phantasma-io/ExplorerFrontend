import React, { useState, useCallback } from 'react';
import { Box, Grid, GridSpacing, IconButton, Tooltip } from '@mui/material';
import { useThemeMode } from 'containers/ThemeProvider';
import { Link } from 'components/display';
import { useDarkMode, useRenderDetails } from 'hooks';
import { routes } from 'cfg';
import { Locales } from 'types/locales';
import { TableDisplayRow, TableDisplayCol } from 'types/table';
import { DetailsValue } from 'types/components';
import { useEcho } from 'hooks/useEcho';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export interface TableRowProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  raw: any;
  row: TableDisplayRow;
  cols: TableDisplayCol[];
  spacing?: GridSpacing;
  clickable?: boolean;
  linkOptions?: TableDisplayCol['linkOptions'];
}

export const TableRow = ({
  raw,
  cols,
  row,
  spacing,
  clickable = false,
  linkOptions,
}: TableRowProps) => {
  const { echoActiveId } = useEcho();
  const { themeActive } = useThemeMode();
  const { isDark } = useDarkMode();
  const renderDetails = useRenderDetails();

  const [isHover, isHoverSet] = useState<boolean>(false);

  const openLink = useCallback(() => {
    if (linkOptions) {
      const href = routes[linkOptions.route](echoActiveId as Locales, {
        id: raw[linkOptions.key],
      });
      window.location.href = href;
    }
  }, [linkOptions, echoActiveId, raw]);

  return (
    <Box
      py={0.81}
      onMouseEnter={() => isHoverSet(true)}
      onMouseLeave={() => isHoverSet(false)}
      style={{
        backgroundColor:
          !isDark && isHover ? '#e5e5e5' : themeActive.palette.background.paper,
        backgroundImage:
          isDark && isHover
            ? undefined
            : `linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))`,
        cursor: clickable ? 'pointer' : 'default',
        borderBottom: `1px solid ${themeActive.palette.divider}`,
      }}
      onClick={openLink}
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
                    href={routes[linkOptions.route](echoActiveId as Locales, {
                      id: raw[linkOptions.key],
                    })}
                    asChild
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
