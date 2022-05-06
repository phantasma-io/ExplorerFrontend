import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Header, HeaderProps } from './Header';
import { HEADER_HEIGHT } from '../../../cfg';

export default {
  title: 'Components/Layout/Header',
  component: Header,
  parameters: {
    componentSubtitle: 'Header',
  },
} as Meta;

export const Default: Story<HeaderProps> = () => (
  <div style={{ backgroundColor: 'black' }}>
    <Header height={HEADER_HEIGHT} />
  </div>
);
