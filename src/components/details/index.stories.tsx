import React from 'react';
import { Story, Meta } from '@storybook/react';
import {
  DetailsNumber,
  DetailsText,
  DetailsDate,
  DetailsBoolean,
  DetailsThumbnail,
} from '.';

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

export const Thumbnail: Story = () => (
  <DetailsThumbnail
    thumb="https://cdn.ghostmarket.io/ext-thumbs/QmazJYqD7tmDCpyT4K59cR3v9vkQqBUW8fPkv1qj4GwVFX"
    link="https://cdn.ghostmarket.io/ext-full/QmazJYqD7tmDCpyT4K59cR3v9vkQqBUW8fPkv1qj4GwVFX"
  />
);
