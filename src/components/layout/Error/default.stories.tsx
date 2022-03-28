import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Error, ErrorProps } from '.';

export default {
  title: 'Components/Layout/Error',
  component: Error,
  parameters: {
    componentSubtitle: 'Error component',
  },
} as Meta;

export const Default: Story<ErrorProps> = () => <Error />;
