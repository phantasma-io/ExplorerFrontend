import React from 'react';
import { Story, Meta } from '@storybook/react';
import { TableDisplay, TableDisplayProps } from '.';
import { TableDisplayCol, TableDisplayCell } from './types';

export default {
  title: 'Components/Table/Display',
  component: TableDisplay,
  parameters: {
    componentSubtitle: 'Table Display Component',
    nextRouter: {
      pathname: '/[locale]/[view]',
      asPath: '/en/nexus',
      query: {
        tab: 'addresses',
      },
    },
  },
} as Meta;

const cols: TableDisplayCol[] = [
  {
    label: 'Col1',
    size: 4,
    cell: 'text',
  },
  {
    label: 'Col2',
    size: 4,
    cell: 'number',
  },
  {
    label: 'Col3',
    size: 4,
    cell: 'text',
  },
];

const rows: TableDisplayCell[] = ['Cell1', 2, 'Cell3'];

export const Default: Story<TableDisplayProps> = () => {
  return <TableDisplay rows={rows} cols={cols} total={1000} />;
};
