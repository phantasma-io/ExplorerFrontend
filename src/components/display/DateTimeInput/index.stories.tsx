import React from 'react';
import { Story, Meta } from '@storybook/react';
import { DateTimeInput, DateTimeInputProps } from '.';

export default {
  title: 'Components/Display/DateTime Input',
  component: DateTimeInput,
  parameters: {
    componentSubtitle: 'DateTimeInput component',
  },
} as Meta;

export const Default: Story<DateTimeInputProps> = () => {
  // eslint-disable-next-line no-console
  const onChange = () => console.log('datetime changed');

  return <DateTimeInput onChange={onChange} />;
};
