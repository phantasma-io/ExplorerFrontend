import React from 'react';
import { Fullscreen } from '../../components';
import { FOOTER_HEIGHT, HEADER_HEIGHT } from '../../cfg';

/**
 * ViewHome
 */
export const ViewHome = () => (
  <Fullscreen subtract={HEADER_HEIGHT + FOOTER_HEIGHT}>HOME</Fullscreen>
);
