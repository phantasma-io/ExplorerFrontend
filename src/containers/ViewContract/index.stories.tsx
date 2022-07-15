import React from 'react';
import { Story, Meta } from '@storybook/react';
import { ViewContract } from '.';

export default {
  title: 'Containers/Views/Contract',
  component: ViewContract,
  parameters: {
    componentSubtitle: 'Contract',
  },
} as Meta;

export const Overview: Story = () => <ViewContract />;
