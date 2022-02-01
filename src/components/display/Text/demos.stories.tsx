import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Text, TextProps } from '.';
import { Link } from '../Link';

export default {
  title: 'Components/Display/Text/Demos',
  component: Text,
  parameters: {
    componentSubtitle: 'Text display demos',
  },
} as Meta;

export const BasicText: Story<TextProps> = () => <Text value="Basic Text" />;

export const BasicLabel: Story<TextProps> = () => (
  <Text label="Label" value="Basic Text" spacing={1} />
);

export const BasicClipboard: Story<TextProps> = () => (
  <Text clipboard spacing={1} value="Basic Text" />
);

export const Capitalize: Story<TextProps> = () => (
  <Text capitalize value="lorem ipsum dolor sit amet" />
);

export const CapitalizeWords: Story<TextProps> = () => (
  <Text capitalize="allWords" value="lorem ipsum dolor sit amet" />
);

export const CapitalizeClipboard: Story<TextProps> = () => (
  <Text capitalize="allWords" clipboard value="lorem ipsum dolor sit amet" />
);

export const Truncate: Story<TextProps> = () => (
  <Text truncate={{ len: 20 }} value="Lorem ipsum dolor sit amet" />
);

export const TruncateWords: Story<TextProps> = () => (
  <Text
    truncate={{ len: 20, keepLastWord: true }}
    value="Lorem ipsum dolor sit amet"
  />
);

export const TruncateClipboard: Story<TextProps> = () => (
  <Text
    truncate={{ len: 20, keepLastWord: true }}
    clipboard
    value="Lorem ipsum dolor sit amet"
  />
);

export const FormatNumber: Story<TextProps> = () => (
  <Text formatNumber={1337} />
);

export const FormatNumberClipboard: Story<TextProps> = () => (
  <Text formatNumber={1337} clipboard />
);

export const FormatDate: Story<TextProps> = () => (
  <Text formatDate={new Date()} />
);

export const Translate: Story<TextProps> = () => (
  <Text translate value="example" />
);

export const TranslateLabel: Story<TextProps> = () => (
  <Text translate label="example" value="example" spacing={1} />
);

export const TranslateClipboard: Story<TextProps> = () => (
  <Text translate clipboard spacing={1} value="example" />
);

export const TranslateCapitalize: Story<TextProps> = () => (
  <Text translate capitalize="allWords" value="example" />
);

export const TranslateCapitalizeCopy: Story<TextProps> = () => (
  <Text translate capitalize="allWords" clipboard value="example" />
);

export const WithLink: Story<TextProps> = () => (
  <Text label="Link" spacing={1} value="https://phantasma.io/" clipboard>
    <Link href="https://phantasma.io/" external>
      Phantasma Team
    </Link>
  </Text>
);
