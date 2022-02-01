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
} from '@mui/material';
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
          <Typography sx={{ fontWeight: 600 }}>{`${echo(
            'table-pageSize',
          )}: `}</Typography>
        </Grid>
        <Grid item>
          <Typography>{numberFormat(pageSize)}</Typography>
        </Grid>
        <Grid item>
          <IconButton size="small" onClick={handleOpen}>
            <ArrowDropDownIcon />
          </IconButton>
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
            <Typography>{numberFormat(opt)}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};
