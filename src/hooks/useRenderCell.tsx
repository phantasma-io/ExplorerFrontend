import React, { useCallback } from 'react';
import {
  CellBoolean,
  CellDate,
  CellMonospace,
  CellNumber,
  CellText,
  CellScript,
} from 'components/table/Cells';
import { TableDisplayCell, TableDisplayCol } from 'types/table';

type RenderCell = (
  type: TableDisplayCol['cell'],
  value: TableDisplayCell,
  label?: string,
  linkOptions?: TableDisplayCol['linkOptions'],
) => JSX.Element | null;

export const useRenderCell = () => {
  const renderCell = useCallback<RenderCell>(
    (type, value, label, linkOptions) => {
      if (value) {
        switch (type) {
          case 'boolean':
            return <CellBoolean value={value as boolean} label={label} />;
          case 'date':
            return <CellDate value={value as Date} label={label} />;
          case 'number':
            return <CellNumber value={value as number} label={label} />;
          case 'script':
            return <CellScript value={value as string} label={label} />;
          case 'monospace':
            return (
              <CellMonospace
                value={value as string}
                label={label}
                linkOptions={linkOptions}
              />
            );
          case 'text':
          default:
            return <CellText value={value as string} label={label} />;
        }
      }
      return null;
    },
    [],
  );
  return renderCell;
};
