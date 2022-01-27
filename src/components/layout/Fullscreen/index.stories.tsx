import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Fullscreen, FullscreenProps } from '.';

export default {
  title: 'Components/Layout/Fullscreen',
  component: Fullscreen,
  parameters: {
    componentSubtitle: 'Fullscreen component',
  },
} as Meta;

export const StoryComponent: Story<FullscreenProps> = () => (
  <Fullscreen>Centered Fullscreen</Fullscreen>
);
