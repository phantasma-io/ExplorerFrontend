import React from 'react';
import { Story, Meta } from '@storybook/react';
import { TableControls, TableControlsProps } from '.';

export default {
  title: 'Components/Table/Controller',
  component: TableControls,
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

export const Default: Story<TableControlsProps> = () => {
  return <TableControls total={1000} />;
};
