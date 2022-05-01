import React from 'react';
import { Box } from '@mui/material';
import { useFury } from '@ricardojrmcom/fury';
import { Image, Link } from 'components/display';

export interface DetailsThumbnailProps {
  thumb?: string;
  link?: string;
}

export const DetailsThumbnail = ({ thumb, link }: DetailsThumbnailProps) => {
  const { furyActive } = useFury();

  if (thumb && link) {
    return (
      <Box>
        <Link href={link || thumb} external>
          <Box display="inline-block">
            <Image
              responsive
              src={thumb}
              maxHeight="150px"
              style={{
                border: `3px solid ${furyActive.palette.text.secondary}`,
                borderRadius: '3px',
                cursor: 'pointer',
              }}
            />
          </Box>
        </Link>
      </Box>
    );
  }

  return null;
};
