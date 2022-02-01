import React from 'react';
import { Story, Meta } from '@storybook/react';
import { LayoutPage, LayoutPageProps } from '.';

export default {
  title: 'Containers/Layout/Page',
  component: LayoutPage,
  parameters: {
    componentSubtitle: 'Page',
  },
} as Meta;

export const Default: Story<LayoutPageProps> = () => (
  <LayoutPage>
    <></>
  </LayoutPage>
);
