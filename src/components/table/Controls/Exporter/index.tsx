import React, { useCallback } from 'react';
import { Box, Button } from '@mui/material';
import csvDownload from 'json-to-csv-export';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { useI18n } from 'hooks';

export interface TableExporterProps {
  data: unknown[] | string;
  filename?: string;
  delimiter?: ',' | ';';
}

export const TableExporter = ({
  data,
  filename = 'export.csv',
  delimiter = ',',
}: TableExporterProps) => {
  const { t } = useI18n();

  const handleExport = useCallback(() => {
    try {
      const parsed =
        typeof data === 'string' ? (JSON.parse(data) as unknown) : data;
      if (!Array.isArray(parsed)) {
        return;
      }
      csvDownload(parsed, filename, delimiter);
    } catch (err) {
      // swallow export errors to avoid crashing UI
    }
  }, [data, delimiter, filename]);

  return (
    <Box>
      <Box>
        <Button
          size="small"
          onClick={handleExport}
          endIcon={<FileDownloadIcon color="inherit" />}
          color="inherit"
        >
          {t('table-exportCsv')}
        </Button>
      </Box>
    </Box>
  );
};
