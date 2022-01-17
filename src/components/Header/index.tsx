import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';

/**
 * Header props
 */
export interface HeaderProps {
  /**
   * Element height
   */
  height: number;
}

/**
 * Header
 */
export const Header = ({ height }: HeaderProps) => {
  // const { push } = useRouter();
  // const { furyActive, furyActiveId, furySetById } = useFury();
  // const { echo, echoActiveId, echoSetById } = useEcho();
  // const { painActive, painActiveId, painSetById } = usePain();

  // const isDark = useMemo(() => furyActiveId.includes('-dark'), [furyActiveId]);

  // const toggleDarkMode = useCallback(() => {
  //   if (isDark) {
  //     furySetById(furyActiveId.split('-')[0]);
  //   } else {
  //     furySetById(`${furyActiveId}-dark`);
  //   }
  // }, [isDark, furyActiveId, furySetById]);

  return (
    <Box
      px={{
        xs: 1,
        sm: 2,
        md: 3,
        lg: 4,
        xl: 5,
      }}
      sx={{ background: 'transparent' }}
    >
      <Grid container sx={{ height: `${height}px` }} alignItems="center">
        <Grid item xs>
          <Grid container alignItems="center" spacing={1}>
            <Grid item>
              <Box pt={0.5}>
                <Tooltip title={'HEADER'}>
                  <Box>HEADER</Box>
                </Tooltip>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
