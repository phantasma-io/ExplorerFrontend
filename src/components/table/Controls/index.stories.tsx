import React, { useState } from 'react';
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
  const [page, pageSet] = useState(1);
  const [pageSize, pageSizeSet] = useState(25);

  return (
    <TableControls
      total={1000}
      page={page}
      pageSet={pageSet}
      pageSize={pageSize}
      pageSizeSet={pageSizeSet}
    />
  );
};
