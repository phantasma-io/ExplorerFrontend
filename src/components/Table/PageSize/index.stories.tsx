import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react';
import { TablePageSize, TablePageSizeProps } from '.';

export default {
  title: 'Table/Page Size',
  component: TablePageSize,
  parameters: {
    componentSubtitle: 'Table Pagination Component',
  },
} as Meta;

export const Default: Story<TablePageSizeProps> = () => {
  const [pageSize, pageSizeSet] = useState(25);

  const options = [25, 50, 100];

  return (
    <TablePageSize
      pageSize={pageSize}
      pageSizeSet={pageSizeSet}
      options={options}
    />
  );
};
