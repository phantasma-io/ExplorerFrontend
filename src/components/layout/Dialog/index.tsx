import React, { ReactChild, ReactChildren } from 'react';
import {
  Dialog as MuiDialog,
  Paper,
  Box,
  Grid,
  Tooltip,
  IconButton,
} from '@mui/material';
import { useEcho } from '@ricardo-jrm/echo';
import CloseIcon from '@mui/icons-material/Close';
import { Text } from 'components/display';

export interface DialogProps {
  isOpen: boolean;
  handleClose: () => void;
  title: string;
  children?: ReactChild | ReactChildren | Element | null;
  actions?: ReactChild | ReactChildren | Element | null;
}

export const Dialog = ({
  handleClose,
  isOpen,
  title,
  children,
  actions,
}: DialogProps) => {
  const { echo } = useEcho();
  return (
    <MuiDialog open={isOpen} onClose={handleClose} maxWidth="md" fullWidth>
      <Paper>
        <Box py={1} px={2}>
          {/* header */}
          <Box>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <Text variant="h6" value={title} />
              </Grid>
              <Grid item>
                <Tooltip title={echo('close')}>
                  <IconButton size="small" onClick={handleClose}>
                    <CloseIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Box>

          {/* children */}
          <Box p={1}>{children}</Box>

          {/* actions */}
          <Box pb={1}>
            <Grid container justifyContent="flex-end">
              <Grid item>{actions}</Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>
    </MuiDialog>
  );
};
