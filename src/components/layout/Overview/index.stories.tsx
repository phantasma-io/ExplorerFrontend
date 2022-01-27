import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Overview, OverviewProps, OverviewItem } from '.';

export default {
  title: 'Components/Layout/Overview',
  component: Overview,
  parameters: {
    componentSubtitle: 'Overview Component',
  },
} as Meta;

const items: OverviewItem[] = [
  {
    label: 'Name',
    value: 'Test',
    clipboard: true,
  },
  {
    label: 'Link',
    value: 'My page',
    link: {
      href: 'https://phantasma.io/',
      external: true,
    },
    clipboard: true,
  },
];

export const StoryComponent: Story<OverviewProps> = () => (
  <Overview items={items} />
);
