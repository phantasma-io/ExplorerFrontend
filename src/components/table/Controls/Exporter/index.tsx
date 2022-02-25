import React, { useMemo } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { useEcho } from '@ricardo-jrm/echo';
import csvDownload from 'json-to-csv-export';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

export interface TableExporterProps {
  data: string;
  filename?: string;
  delimiter?: ',' | ';';
}

export const TableExporter = ({
  data,
  filename = 'export.csv',
  delimiter = ',',
}: TableExporterProps) => {
  const { echo } = useEcho();

  const parsedData = useMemo(() => JSON.parse(data), [data]);

  return (
    <Tooltip title={echo('table-exportCsv')} placement="top">
      <IconButton
        size="small"
        onClick={() => csvDownload(parsedData, filename, delimiter)}
      >
        <FileDownloadIcon
          style={{
            height: '18px',
            width: 'auto',
          }}
        />
      </IconButton>
    </Tooltip>
  );
};
