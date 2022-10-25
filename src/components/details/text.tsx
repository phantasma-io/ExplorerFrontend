import React, { useMemo } from 'react';
import { useEcho } from '@ricardojrmcom/echo';
import { Text } from 'components/display';
import { routes } from 'cfg';
import { DetailsLinkOptions } from 'types/components';
import { Locales } from 'types/locales';

export interface DetailsTextProps {
  value: string;
  label?: string;
  linkOptions?: DetailsLinkOptions;
  height?: string;
  append?: string;
}

export const DetailsText = ({
  value,
  label,
  linkOptions,
  height,
  append,
}: DetailsTextProps) => {
  const { echoActiveId } = useEcho();

  const link = useMemo(() => {
    if (linkOptions) {
      return routes[linkOptions?.route](echoActiveId as Locales, {
        id: value,
      });
    }
    return null;
  }, [linkOptions, value, echoActiveId]);

  return (
    <Text
      value={value}
      variant="body2"
      wordBreak="break-all"
      label={label}
      spacing={1}
      height={height}
      append={append}
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
