import React, { useCallback, useState } from 'react';
import { useEcho } from 'hooks/useEcho';
import { numberFormat } from 'scripts/format';
import { Box, Grid, Typography, Menu, MenuItem, Button } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export interface TablePageSizeProps {
  pageSize: number;
  pageSizeSet: (size: number) => void;
  options: number[];
}

export const TablePageSize = ({
  pageSize,
  pageSizeSet,
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
        {options.map((opt) => (
          <MenuItem
            key={`table-pageSize-opt-${opt}`}
            onClick={() => {
              pageSizeSet(opt);
              handleClose();
            }}
          >
            <Typography variant="body2">{numberFormat(opt)}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};
