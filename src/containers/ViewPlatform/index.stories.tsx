import React from 'react';
import { Story, Meta } from '@storybook/react';
import { ViewPlatform } from '.';

export default {
  title: 'Containers/Views/Platform',
  component: ViewPlatform,
  parameters: {
    componentSubtitle: 'Platform',
  },
} as Meta;

export const Overview: Story = () => <ViewPlatform />;
