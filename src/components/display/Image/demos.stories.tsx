import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Image, ImageProps } from '.';

export default {
  title: 'Components/Display/Image/Demos',
  component: Image,
  parameters: {
    componentSubtitle: 'Image demos',
  },
} as Meta;

export const Normal: Story<ImageProps> = () => (
  <Image src="/static/v1/img/soul.png" />
);

export const Responsive: Story<ImageProps> = () => (
  <Image src="/static/v1/img/soul.png" responsive />
);

export const Styled: Story<ImageProps> = () => (
  <Image src="/static/v1/img/soul.png" height="120px" />
);

export const StyledResponsive: Story<ImageProps> = () => (
  <Image src="/static/v1/img/soul.png" height="210px" responsive />
);
