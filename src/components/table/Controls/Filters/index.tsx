import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { useEcho } from '@ricardojrmcom/echo';
import FilterListIcon from '@mui/icons-material/FilterList';

export interface TableFiltersProps {
  str?: string;
}

export const TableFilters = ({ str }: TableFiltersProps) => {
  const { echo } = useEcho();

  return (
    <Tooltip
      title={echo('table-openFilters')}
      placement="top"
      style={{ display: 'none' }}
    >
      <IconButton size="small" onClick={() => undefined}>
        <FilterListIcon
          style={{
            height: '18px',
            width: 'auto',
          }}
        />
      </IconButton>
    </Tooltip>
  );
};
