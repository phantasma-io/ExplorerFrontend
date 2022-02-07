import React from 'react';
import { Story, Meta } from '@storybook/react';
import { TableController, TableControllerProps } from '.';

export default {
  title: 'Components/Table/Controller',
  component: TableController,
  parameters: {
    componentSubtitle: 'Table Controller Component',
    nextRouter: {
      pathname: '/[locale]/[view]',
      asPath: '/en/nexus',
      query: {
        tab: 'addresses',
        t: 'eyJwYWdlIjoxMCwicGFnZVNpemUiOjEwMH0=',
      },
    },
  },
} as Meta;

export const Default: Story<TableControllerProps> = () => {
  return <TableController total={1000} />;
};
