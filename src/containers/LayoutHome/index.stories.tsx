import React from 'react';
import { Story, Meta } from '@storybook/react';
import { LayoutHome, LayoutHomeProps } from '.';

export default {
  title: 'Containers/Layout/Home',
  component: LayoutHome,
  parameters: {
    componentSubtitle: 'Home',
    nextRouter: {
      path: '/',
      asPath: '/en',
    },
  },
} as Meta;

export const Default: Story<LayoutHomeProps> = () => (
  <LayoutHome>
    <></>
  </LayoutHome>
);
