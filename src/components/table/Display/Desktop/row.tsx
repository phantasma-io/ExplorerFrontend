import React, { useState, useCallback, useMemo } from 'react';
import { nanoid } from 'nanoid';
import { Box, Grid, GridSpacing, IconButton, Tooltip } from '@mui/material';
import { useFury } from '@ricardo-jrm/fury';
import { Link } from 'components/display';
import { useDarkMode, useRenderDetails } from 'hooks';
import { routes } from 'cfg';
import { Locales } from 'types/locales';
import { TableDisplayRow, TableDisplayCol } from 'types/table';
import { DetailsValue } from 'types/components';
import { useEcho } from '@ricardo-jrm/echo';
import csvDownload from 'json-to-csv-export';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export interface TableRowProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  raw: any;
  tableId: string;
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
  tableId,
  index,
  cols,
  row,
  spacing,
  hasClick = false,
  openDialog,
  linkOptions,
}: TableRowProps) => {
  const { echo, echoActiveId } = useEcho();
  const { furyActive } = useFury();
  const { isDark } = useDarkMode();
  const renderCell = useRenderDetails();

  const [isHover, isHoverSet] = useState<boolean>(false);

  const shouldOpenDialog = useCallback(() => {
    if (hasClick) {
      openDialog(row, index);
    }
  }, [hasClick, openDialog, row, index]);

  const csvFilename = useMemo(() => `${tableId}-${nanoid()}.csv`, [tableId]);

  return (
    <Box
      py={0.81}
      onMouseEnter={() => isHoverSet(true)}
      onMouseLeave={() => isHoverSet(false)}
      style={{
        backgroundColor:
          !isDark && isHover ? '#e5e5e5' : furyActive.palette.background.paper,
        backgroundImage:
          isDark && isHover
            ? undefined
            : `linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))`,
        cursor: hasClick ? 'pointer' : 'default',
        borderBottom: `1px solid ${furyActive.palette.divider}`,
      }}
      onClick={shouldOpenDialog}
    >
      <Grid container spacing={spacing}>
        {/* cols */}
        {row.map((cell: DetailsValue, idx) => {
          if (cols[idx].showDesktop) {
            return (
              <Grid item xs={cols[idx].size} key={`${cols[idx].label}-${cell}`}>
                <Box px={1}>{renderCell(cols[idx].type, cell)}</Box>
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
              <Grid item>
                <Tooltip title={echo('table-exportCsv')} placement="top">
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      csvDownload([raw], csvFilename, ',');
                    }}
                  >
                    <FileDownloadIcon
                      style={{
                        height: '15px',
                        width: 'auto',
                      }}
                    />
                  </IconButton>
                </Tooltip>
              </Grid>
              {linkOptions && (
                <Grid item>
                  <Link
                    href={routes[linkOptions.route](echoActiveId as Locales, {
                      id: raw[linkOptions.key],
                    })}
                    title={linkOptions.title}
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
