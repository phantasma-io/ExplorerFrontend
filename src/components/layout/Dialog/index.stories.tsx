import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Dialog, DialogProps } from '.';

export default {
  title: 'Components/Layout/Dialog',
  component: Dialog,
  parameters: {
    componentSubtitle: 'Dialog Component',
  },
} as Meta;

export const Default: Story<DialogProps> = () => {
  return <Dialog isOpen handleClose={() => undefined} title="Dialog" />;
};
