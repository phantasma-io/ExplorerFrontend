import React, { ReactNode } from 'react';
import csvDownload from 'json-to-csv-export';
import { Box, Button } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { useI18n } from 'hooks';

export interface OverviewProps {
  children?: ReactNode;
  csvFilename?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  raw?: any;
}

export const Overview = ({ children, csvFilename, raw }: OverviewProps) => {
  const { t } = useI18n();

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
          {t('table-exportCsv')}
        </Button>
      </Box>
    </Box>
  );
};
