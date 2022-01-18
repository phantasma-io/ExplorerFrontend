import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Link, LinkProps } from '.';

export default {
  title: 'Components/Link',
  component: Link,
  parameters: {
    componentSubtitle: 'Link Component',
  },
} as Meta;

export const Internal: Story<LinkProps> = () => (
  <Link href="/?path=/story/components-text--basic-text">Internal link</Link>
);

export const External: Story<LinkProps> = () => (
  <Link href="https://github.com/ricardo-jrm" external>
    External link
  </Link>
);

export const Styled: Story<LinkProps> = () => (
  <Link
    href="https://github.com/ricardo-jrm"
    external
    sx={{ color: '#000', textDecoration: 'none' }}
  >
    Styled link
  </Link>
);
