import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Image, ImageProps } from '.';

export default {
  title: 'Components/Display/Image',
  component: Image,
  parameters: {
    componentSubtitle: 'Image',
  },
} as Meta;

export const Default: Story<ImageProps> = (args) => (
  <Image {...args} src="/static/v1/img/placeholder.png" />
);
