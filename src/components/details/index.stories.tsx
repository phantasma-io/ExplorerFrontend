import React from 'react';
import { Story, Meta } from '@storybook/react';
import { DetailsNumber, DetailsText, DetailsDate, DetailsBoolean } from '.';

export default {
  title: 'Components/Details',
  component: DetailsText,
  parameters: {
    componentSubtitle: 'Details Component',
  },
} as Meta;

export const Text: Story = () => <DetailsText value="Lorem" />;

export const Number: Story = () => <DetailsNumber value={1337} />;

export const Boolean: Story = () => <DetailsBoolean value />;

export const WithDate: Story = () => <DetailsDate value={new Date()} />;
