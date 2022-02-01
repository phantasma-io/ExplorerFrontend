import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Footer, FooterProps } from '.';
import { FOOTER_HEIGHT } from '../../../cfg';

export default {
  title: 'Components/Layout/Footer',
  component: Footer,
  parameters: {
    componentSubtitle: 'Footer',
  },
} as Meta;

export const Default: Story<FooterProps> = () => (
  <div style={{ backgroundColor: 'black' }}>
    <Footer height={FOOTER_HEIGHT} />
  </div>
);
