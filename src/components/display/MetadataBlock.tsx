import React, { useMemo } from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';

export interface MetadataBlockProps {
  title: string;
  metadata?: Record<string, unknown>;
}

export const MetadataBlock = ({ title, metadata }: MetadataBlockProps) => {
  const entries = useMemo(() => {
    if (!metadata) return [];

    return Object.entries(metadata).filter(
      ([, value]) => value !== null && value !== undefined && `${value}`.trim() !== '',
    );
  }, [metadata]);

  if (entries.length === 0) return null;

  return (
    <Paper
      elevation={0}
      sx={{
        mt: 2,
        p: 2,
        borderRadius: 2,
        border: (theme) => `1px solid ${theme.palette.divider}`,
        background: (theme) =>
          theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))'
            : 'linear-gradient(135deg, rgba(0,0,0,0.02), rgba(0,0,0,0.01))',
      }}
    >
      <Typography variant="h6" sx={{ mb: 1, fontWeight: 700 }}>
        {title}
      </Typography>
      <Grid container spacing={1}>
        {entries.map(([key, value]) => (
          <Grid key={key} item xs={12} sm={6}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: 1,
                p: 1,
                borderRadius: 1.5,
                background: (theme) =>
                  theme.palette.mode === 'dark'
                    ? 'rgba(255,255,255,0.04)'
                    : 'rgba(0,0,0,0.02)',
              }}
            >
              <Typography
                variant="body2"
                sx={{ fontFamily: 'monospace', color: 'text.secondary', minWidth: '35%' }}
              >
                {key}
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, textAlign: 'right', wordBreak: 'break-word' }}
              >
                {typeof value === 'string' ? value : JSON.stringify(value)}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};
