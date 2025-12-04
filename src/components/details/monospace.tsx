import React, { useMemo } from 'react';
import { Text } from 'components/display';
import { routes } from 'cfg';
import { DetailsLinkOptions } from 'types/components';
import { Locales } from 'types/locales';
import { useI18n } from 'hooks';

export interface DetailsMonospaceProps {
  value: string;
  label?: string;
  linkOptions?: DetailsLinkOptions;
  height?: string;
}

export const DetailsMonospace = ({
  value,
  label,
  linkOptions,
  height,
}: DetailsMonospaceProps) => {
  const { locale } = useI18n();

  const link = useMemo(() => {
    if (linkOptions) {
      return routes[linkOptions?.route](locale as Locales, {
        id: value,
      });
    }
    return null;
  }, [linkOptions, value, locale]);

  return (
    <Text
      value={value}
      variant="body2"
      wordBreak="break-all"
      label={label}
      spacing={1}
      clipboard
      monospace
      height={height}
      linkOptions={
        link
          ? {
              link,
              title: linkOptions?.title || '',
            }
          : undefined
      }
    />
  );
};
