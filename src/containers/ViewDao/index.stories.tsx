import React from 'react';
import { Story, Meta } from '@storybook/react';
import { ViewDao } from '.';

export default {
  title: 'Containers/Views/Dao',
  component: ViewDao,
  parameters: {
    componentSubtitle: 'Dao',
  },
} as Meta;

export const Overview: Story = () => <ViewDao />;

export const Members: Story = () => <ViewDao tabForce="members" />;
