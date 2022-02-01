import React from 'react';
import { Story, Meta } from '@storybook/react';
import { ViewToken } from '.';

export default {
  title: 'Containers/Views/Token',
  component: ViewToken,
  parameters: {
    componentSubtitle: 'Token',
  },
} as Meta;

export const Overview: Story = () => <ViewToken />;
