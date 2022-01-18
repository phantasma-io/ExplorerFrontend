import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
import { useFury } from '@ricardo-jrm/fury';
import { Box, Grid } from '@mui/material';
import { Link } from '../Link';
import { FOOTER_HEIGHT, FOOTER_OFFSET } from '../../cfg';

/**
 * Footer props
 */
export interface FooterProps {
  /**
   * Element Height
   */
  height?: number;
  offset?: number;
}

/**
 * Footer
 */
export const Footer = ({
  height = FOOTER_HEIGHT,
  offset = FOOTER_OFFSET,
}: FooterProps) => {
  const { pathname } = useRouter();

  const { furyActive } = useFury();

  const isHome = useMemo(
    () => pathname === '/' || pathname === '/blankhome',
    [pathname],
  );

  return (
    <Box>
      <div
        style={{
          visibility: isHome ? 'hidden' : 'visible',
          position: 'absolute',
          bottom: `${height - 1}px`,
          height: offset,
          left: 0,
          width: '100%',
          overflow: 'hidden',
          lineHeight: 0,
          transform: 'rotate(180deg)',
        }}
      >
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          style={{
            position: 'relative',
            display: 'block',
            width: 'calc(100% + 1.3px)',
            height: '63px',
          }}
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            fill={furyActive.palette.primary.main}
          />
        </svg>
      </div>
      <Grid
        container
        sx={{
          height: `${height}px`,
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          backgroundColor: isHome
            ? 'transparent'
            : furyActive.palette.primary.main,
        }}
        alignItems="center"
        alignContent="center"
        justifyItems="center"
        justifyContent="center"
      >
        <Grid item xs={12}>
          <Grid
            container
            alignItems="center"
            alignContent="center"
            justifyItems="center"
            justifyContent="center"
          >
            <Grid item>
              <Link
                align="center"
                href="https://phantasma.io/"
                external
                sx={{
                  color: '#fff',
                  textDecoration: 'none',
                }}
              >
                {'Copyright © Phantasma Team 2021-2022'}
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
