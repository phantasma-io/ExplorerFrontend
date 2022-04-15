import React from 'react';
import { Box } from '@mui/material';
import { useFury } from '@ricardo-jrm/fury';
import { Image, Link } from 'components/display';

export interface DetailsThumbnailProps {
  thumb?: string;
  link?: string;
}

export const DetailsThumbnail = ({ thumb, link }: DetailsThumbnailProps) => {
  const { furyActive } = useFury();
  if (thumb) {
    return (
      <Box>
        <Link href={link || thumb} external>
          <Box
            p={0.33}
            display="inline-block"
            sx={{
              backgroundColor: furyActive.palette.text.secondary,
              borderRadius: '3px',
              cursor: 'pointer',
            }}
          >
            <Image responsive src={thumb} maxHeight="150px" />
          </Box>
        </Link>
      </Box>
    );
  }

  return null;
};
