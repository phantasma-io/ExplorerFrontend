import React from 'react';
import { Story, Meta } from '@storybook/react';
import { ViewChain } from '.';

export default {
  title: 'Containers/Views/Chain',
  component: ViewChain,
  parameters: {
    componentSubtitle: 'Chain',
  },
} as Meta;

export const Overview: Story = () => <ViewChain />;

export const Transactions: Story = () => <ViewChain tabForce="blocks" />;

export const Events: Story = () => <ViewChain tabForce="contracts" />;
