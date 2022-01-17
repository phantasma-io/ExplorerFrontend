import React from 'react';
import { Typography, Box, Button, Grid, Paper } from '@mui/material';
import { useFury } from '@ricardo-jrm/fury';
import { usePain } from '@ricardo-jrm/pain';
import { useEmpathy } from '@ricardo-jrm/empathy';
import { useEcho } from '@ricardo-jrm/echo';

/**
 * ExampleComponent props
 */
export interface ExampleComponentProps {
  /**
   * Prop
   */
  text: string;
}

/**
 * ExampleComponent
 */
export const ExampleComponent = ({ text }: ExampleComponentProps) => {
  const { furyActive, furySetById } = useFury();
  const { palette } = furyActive;
  const { echo, echoSetById } = useEcho();
  const { painActive, painSetById } = usePain();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, loading } = useEmpathy<any>(
    'https://jsonplaceholder.typicode.com/users/1',
  );

  return (
    <Paper>
      <Box p={3}>
        <Typography data-testid="test-component">{text}</Typography>
        <Typography>{loading ? 'Loading...' : data.name}</Typography>
        <Typography sx={{ color: palette.primary.main }}>
          <b>{painActive.name}</b>
        </Typography>
        <Typography sx={{ color: palette.secondary.main }}>
          {echo('example')}
        </Typography>

        <Box>
          <Grid container spacing={1}>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={() => painSetById('nebula')}
              >
                Nebula
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={() => painSetById('ace')}
              >
                Ace
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={() => painSetById('fury')}
              >
                Fury
              </Button>
            </Grid>
          </Grid>

          <Grid container spacing={1} my={1}>
            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => furySetById('nebula')}
              >
                NEBULA
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => furySetById('nebula-dark')}
              >
                NEBULA DARK
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => furySetById('ace')}
              >
                ACE
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => furySetById('ace-dark')}
              >
                ACE DARK
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => furySetById('fury')}
              >
                FURY
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => furySetById('fury-dark')}
              >
                FURY DARK
              </Button>
            </Grid>
          </Grid>

          <Grid container spacing={1} my={1}>
            <Grid item>
              <Button onClick={() => echoSetById('en')}>EN</Button>
            </Grid>
            <Grid item>
              <Button onClick={() => echoSetById('pt')}>PT</Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Paper>
  );
};
