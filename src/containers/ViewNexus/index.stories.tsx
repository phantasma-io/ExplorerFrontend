import React from 'react';
import { Story, Meta } from '@storybook/react';
import { ViewNexus } from '.';

export default {
  title: 'Containers/Views/Nexus',
  component: ViewNexus,
  parameters: {
    componentSubtitle: 'Nexus',
  },
} as Meta;

export const Chains: Story = () => <ViewNexus />;

export const Token: Story = () => <ViewNexus tabForce="tokens" />;

export const Daos: Story = () => <ViewNexus tabForce="daos" />;
