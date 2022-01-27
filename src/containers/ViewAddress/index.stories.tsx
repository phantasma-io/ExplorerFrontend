import React from 'react';
import { Story, Meta } from '@storybook/react';
import { ViewAddress } from '.';

export default {
  title: 'Containers/Views/Address',
  component: ViewAddress,
  parameters: {
    componentSubtitle: 'Address',
  },
} as Meta;

export const Overview: Story = () => <ViewAddress />;

export const Balances: Story = () => <ViewAddress tabForce="balances" />;

export const Transactions: Story = () => (
  <ViewAddress tabForce="transactions" />
);
