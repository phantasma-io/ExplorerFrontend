import React from 'react';
import { Story, Meta } from '@storybook/react';
import { SearchInput, SearchInputProps } from '.';

export default {
  title: 'Components/Display/Search Input',
  component: SearchInput,
  parameters: {
    componentSubtitle: 'SearchInput component',
  },
} as Meta;

export const Default: Story<SearchInputProps> = () => {
  // eslint-disable-next-line no-console
  const onChange = () => console.log('datetime changed');

  return <SearchInput />;
};
