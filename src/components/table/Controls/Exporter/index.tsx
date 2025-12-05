import React, { useMemo } from 'react';
import { Box, Button } from '@mui/material';
import { useEcho } from 'hooks/useEcho';
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
      <Box>
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
