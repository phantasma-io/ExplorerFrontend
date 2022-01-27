import React from 'react';
import { Story, Meta } from '@storybook/react';
import { ViewHome } from '.';

export default {
  title: 'Containers/Views/Home',
  component: ViewHome,
  parameters: {
    componentSubtitle: 'Home',
  },
} as Meta;

export const Default: Story = () => (
  <div style={{ backgroundColor: 'black' }}>
    <ViewHome />
  </div>
);
