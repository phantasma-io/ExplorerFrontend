import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Empty, EmptyProps } from '.';

export default {
  title: 'Components/Layout/Empty',
  component: Empty,
  parameters: {
    componentSubtitle: 'Empty component',
  },
} as Meta;

export const Default: Story<EmptyProps> = () => <Empty />;
