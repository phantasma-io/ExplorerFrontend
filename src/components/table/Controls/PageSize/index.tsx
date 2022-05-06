import React, { useCallback, useState } from 'react';
import { useEcho } from '@ricardojrmcom/echo';
import { numberFormat } from '@ricardojrmcom/dervish';
import { Box, Grid, Typography, Menu, MenuItem, Button } from '@mui/material';
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
          <Button
            size="small"
            color="inherit"
            endIcon={<ArrowDropDownIcon />}
            onClick={handleOpen}
          >{`${echo('table-pageSize')}: ${numberFormat(pageSize)}`}</Button>
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
