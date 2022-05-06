import React, { ReactNode } from 'react';
import csvDownload from 'json-to-csv-export';
import { useEcho } from '@ricardojrmcom/echo';
import { Box, Button } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

export interface OverviewProps {
  children?: ReactNode;
  csvFilename?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  raw?: any;
}

export const Overview = ({ children, csvFilename, raw }: OverviewProps) => {
  const { echo } = useEcho();

  return (
    <Box>
      <Box>{children}</Box>
      <Box textAlign="right" pt={1}>
        <Button
          variant="contained"
          color="primary"
          endIcon={<FileDownloadIcon />}
          onClick={() => csvDownload([raw], csvFilename, ',')}
        >
          {echo('table-exportCsv')}
        </Button>
      </Box>
    </Box>
  );
};
