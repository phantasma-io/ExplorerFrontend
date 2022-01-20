import React from 'react';
import { Story, Meta } from '@storybook/react';
import { NotFound, NotFoundProps } from '.';

export default {
  title: 'Components/404',
  component: NotFound,
  parameters: {
    componentSubtitle: '404 Component',
  },
} as Meta;

export const StoryComponent: Story<NotFoundProps> = () => (
  <NotFound kind="block" />
);
