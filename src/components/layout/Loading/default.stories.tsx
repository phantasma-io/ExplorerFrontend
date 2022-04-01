import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Loading, LoadingProps } from '.';

export default {
  title: 'Components/Layout/Loading',
  component: Loading,
  parameters: {
    componentSubtitle: 'Loading component',
  },
} as Meta;

export const Default: Story<LoadingProps> = () => <Loading />;
