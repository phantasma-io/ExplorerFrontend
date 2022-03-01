import React from 'react';
import { Story, Meta } from '@storybook/react';
import { CellNumber, CellText, CellDate, CellBoolean } from '.';

export default {
  title: 'Components/Table/Cells',
  component: CellText,
  parameters: {
    componentSubtitle: 'Table Cells Component',
  },
} as Meta;

export const Text: Story = () => <CellText value="Lorem" />;

export const Number: Story = () => <CellNumber value={1337} />;

export const Boolean: Story = () => <CellBoolean value />;

export const WithDate: Story = () => <CellDate value={new Date()} />;
