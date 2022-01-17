import React from 'react';
import {
  Fullscreen,
  HEADER_HEIGHT,
  FOOTER_HEIGHT,
  FOOTER_OFFSET,
} from '@ricardo-jrm/ace';

/**
 * ViewHome
 */
export const ViewHome = () => (
  <Fullscreen subtract={HEADER_HEIGHT + FOOTER_OFFSET + FOOTER_HEIGHT}>
    HOME
  </Fullscreen>
);
