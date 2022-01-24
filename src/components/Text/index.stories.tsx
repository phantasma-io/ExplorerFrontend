import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Text, TextProps } from '.';
import { Link } from '../Link';

export default {
  title: 'Components/Text',
  component: Text,
  parameters: {
    componentSubtitle: 'Text display component',
  },
} as Meta;

export const BasicText: Story<TextProps> = (args) => (
  <Text {...args} value="Basic Text" />
);

export const BasicLabel: Story<TextProps> = (args) => (
  <Text {...args} label="Label" value="Basic Text" spacing={1} />
);

export const BasicClipboard: Story<TextProps> = (args) => (
  <Text {...args} clipboard spacing={1} value="Basic Text" />
);

export const Capitalize: Story<TextProps> = (args) => (
  <Text {...args} capitalize value="lorem ipsum dolor sit amet" />
);

export const CapitalizeWords: Story<TextProps> = (args) => (
  <Text {...args} capitalize="allWords" value="lorem ipsum dolor sit amet" />
);

export const CapitalizeClipboard: Story<TextProps> = (args) => (
  <Text
    {...args}
    capitalize="allWords"
    clipboard
    value="lorem ipsum dolor sit amet"
  />
);

export const Truncate: Story<TextProps> = (args) => (
  <Text {...args} truncate={{ len: 20 }} value="Lorem ipsum dolor sit amet" />
);

export const TruncateWords: Story<TextProps> = (args) => (
  <Text
    {...args}
    truncate={{ len: 20, keepLastWord: true }}
    value="Lorem ipsum dolor sit amet"
  />
);

export const TruncateClipboard: Story<TextProps> = (args) => (
  <Text
    {...args}
    truncate={{ len: 20, keepLastWord: true }}
    clipboard
    value="Lorem ipsum dolor sit amet"
  />
);

export const FormatNumber: Story<TextProps> = (args) => (
  <Text {...args} formatNumber value={1337} />
);

export const FormatNumberClipboard: Story<TextProps> = (args) => (
  <Text {...args} formatNumber clipboard value={1337} />
);

export const FormatDate: Story<TextProps> = (args) => (
  <Text {...args} formatDate={new Date()} />
);

export const FormatDateClipboard: Story<TextProps> = (args) => (
  <Text {...args} formatDate={new Date()} clipboard />
);

export const Translate: Story<TextProps> = (args) => (
  <Text {...args} translate value="example" />
);

export const TranslateLabel: Story<TextProps> = (args) => (
  <Text {...args} translate label="example" value="example" spacing={1} />
);

export const TranslateClipboard: Story<TextProps> = (args) => (
  <Text {...args} translate clipboard spacing={1} value="example" />
);

export const TranslateCapitalize: Story<TextProps> = (args) => (
  <Text {...args} translate capitalize="allWords" value="example" />
);

export const TranslateCapitalizeCopy: Story<TextProps> = (args) => (
  <Text {...args} translate capitalize="allWords" clipboard value="example" />
);

export const WithLink: Story<TextProps> = () => (
  <Text label="Link" spacing={1} value="https://phantasma.io/" clipboard>
    <Link href="https://phantasma.io/" external>
      Phantasma Team
    </Link>
  </Text>
);
