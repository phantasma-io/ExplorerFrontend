import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Text, TextProps } from '.';

export default {
  title: 'Components/Display/Text',
  component: Text,
  parameters: {
    componentSubtitle: 'Text display component',
  },
} as Meta;

export const Default: Story<TextProps> = (args) => (
  <Text value="Default" {...args} />
);
