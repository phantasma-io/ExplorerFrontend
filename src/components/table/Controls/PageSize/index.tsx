/* eslint-disable no-confusing-arrow */
import React, { useCallback, useState } from 'react';
import { useEcho } from '@ricardo-jrm/echo';
import { numberFormat } from '@ricardo-jrm/dervish';
import {
  Box,
  Grid,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Tooltip,
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export interface TablePageSizeProps {
  pageSize: number;
  pageSizeSet: (size: number) => void;
  total: number;
  options: number[];
}

export const TablePageSize = ({
  pageSize,
  pageSizeSet,
  total,
  options,
}: TablePageSizeProps) => {
  const { echo } = useEcho();

  const [anchorMenu, anchorMenuSet] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorMenu);
  const handleOpen = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      anchorMenuSet(event.currentTarget);
    },
    [],
  );
  const handleClose = useCallback(() => {
    anchorMenuSet(null);
  }, []);

  return (
    <Box>
      <Grid container spacing={0.6} alignItems="center">
        <Grid item>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>{`${echo(
            'table-pageSize',
          )}: `}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="body2">{numberFormat(pageSize)}</Typography>
        </Grid>
        <Grid item>
          <Tooltip title={echo('table-changePageSize')} placement="top">
            <IconButton size="small" onClick={handleOpen}>
              <ArrowDropDownIcon />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
      <Menu anchorEl={anchorMenu} open={openMenu} onClose={handleClose}>
        {options.map((opt) =>
          opt !== 0 ? (
            <MenuItem
              key={`table-pageSize-opt-${opt}`}
              onClick={() => {
                pageSizeSet(opt);
                handleClose();
              }}
            >
              <Typography variant="body2">{numberFormat(opt)}</Typography>
            </MenuItem>
          ) : (
            <MenuItem
              key={`table-pageSize-opt-${opt}`}
              onClick={() => {
                pageSizeSet(total);
                handleClose();
              }}
            >
              <Typography variant="body2">{echo('all')}</Typography>
            </MenuItem>
          ),
        )}
      </Menu>
    </Box>
  );
};
