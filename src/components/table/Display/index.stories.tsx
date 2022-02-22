import React from 'react';
import { Story, Meta } from '@storybook/react';
import { TableDisplay, TableDisplayProps } from '.';
import { TableDisplayCol, TableDisplayRow, TableDisplayCell } from './types';

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
    id: 'Col1',
    label: 'Col1',
    size: 4,
    cell: 'text',
  },
  {
    id: 'Col2',
    label: 'Col2',
    size: 4,
    cell: 'number',
  },
  {
    id: 'Col3',
    label: 'Col3',
    size: 4,
    cell: 'text',
  },
];

const rows: TableDisplayRow[] = [
  ['Cell1', 1337, 'Cell3'],
  ['Cell1', undefined, 'Cell3'],
  ['Cell1', 1337, 'Cell3'],
  ['Cell1', 1337, 'Cell3'],
  ['Cell1', 1337, 'Cell3'],
  ['Cell1', 1337, 'Cell3'],
];

export const Default: Story<TableDisplayProps> = () => {
  return <TableDisplay rows={rows} cols={cols} total={1000} />;
};

export const WithDetails: Story<TableDisplayProps> = () => {
  return (
    <TableDisplay
      rows={rows}
      cols={cols}
      total={1000}
      withDetails={{ title: 'Details', action: 'close' }}
    />
  );
};
