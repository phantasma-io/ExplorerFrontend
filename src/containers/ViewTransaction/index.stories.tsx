import React from 'react';
import { Story, Meta } from '@storybook/react';
import { ViewTransaction } from '.';

export default {
  title: 'Containers/Views/Transaction',
  component: ViewTransaction,
  parameters: {
    componentSubtitle: 'Transaction',
  },
} as Meta;

export const Overview: Story = () => <ViewTransaction />;

export const Script: Story = () => <ViewTransaction tabForce="script" />;

export const Events: Story = () => <ViewTransaction tabForce="events" />;
