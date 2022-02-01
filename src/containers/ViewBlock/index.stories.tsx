import React from 'react';
import { Story, Meta } from '@storybook/react';
import { ViewBlock } from '.';

export default {
  title: 'Containers/Views/Block',
  component: ViewBlock,
  parameters: {
    componentSubtitle: 'Block',
  },
} as Meta;

export const Overview: Story = () => <ViewBlock />;

export const Transactions: Story = () => <ViewBlock tabForce="transactions" />;

export const Events: Story = () => <ViewBlock tabForce="events" />;

export const Oracles: Story = () => <ViewBlock tabForce="oracles" />;
