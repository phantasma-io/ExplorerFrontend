import React from 'react';
import { Story, Meta } from '@storybook/react';
import {
  TableDisplayCol,
  TableDisplayRow,
  TableDisplayProps,
} from '../../../types/table';
import { TableDisplay } from '.';

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
    showDesktop: true,
  },
  {
    id: 'Col2',
    label: 'Col2',
    size: 4,
    cell: 'number',
    showDesktop: true,
  },
  {
    id: 'Col3',
    label: 'Col3',
    size: 3,
    cell: 'text',
    showDesktop: true,
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
  return <TableDisplay raw={{}} tableId="SB-TABLE" rows={rows} cols={cols} />;
};
