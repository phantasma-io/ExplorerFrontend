import React, { useMemo } from 'react';
import { IconButton, Tooltip, Box, Button } from '@mui/material';
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
    <Box>
      <Box display={{ xs: 'block', lg: 'none' }}>
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
      </Box>
      <Box display={{ xs: 'none', lg: 'block' }}>
        <Button
          size="small"
          onClick={() => csvDownload(parsedData, filename, delimiter)}
          endIcon={<FileDownloadIcon color="inherit" />}
          color="inherit"
        >
          {echo('table-exportCsv')}
        </Button>
      </Box>
    </Box>
  );
};
