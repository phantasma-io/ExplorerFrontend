import React from 'react';
import { Box, Grid, Button } from '@mui/material';
import { useEcho } from 'hooks/useEcho';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

export interface DetailsScriptProps {
  value: string;
  height?: string;
}

export const DetailsScript = ({
  value,
  height = '75vh',
}: DetailsScriptProps) => {
  const { echo } = useEcho();

  return (
    <Box>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <CopyToClipboard text={value}>
            <Button
              color="primary"
              variant="contained"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              {echo('copy-to-clipboard')}
            </Button>
          </CopyToClipboard>
        </Grid>
        <Grid item xs={12}>
          <Box
            style={{
              maxHeight: height,
              overflowY: 'scroll',
            }}
          >
            <SyntaxHighlighter language="json" style={atomDark}>
              {value}
            </SyntaxHighlighter>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
