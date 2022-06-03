import React, { useState } from 'react';
import { Box } from '@mui/material';
import { Image, Link } from 'components/display';

export interface DetailsThumbnailProps {
  thumb?: string;
  link?: string;
  mini?: boolean;
}

export const DetailsThumbnail = ({
  thumb,
  link,
  mini,
}: DetailsThumbnailProps) => {
  const [hasError, hasErrorSet] = useState<boolean>(false);

  if (thumb && link && !hasError) {
    return (
      <Box>
        <Link href={link || thumb} external>
          <Box display="inline-block">
            <Image
              responsive
              src={thumb}
              maxHeight={mini ? '50px' : '150px'}
              onError={() => {
                hasErrorSet(true);
              }}
              style={{
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
