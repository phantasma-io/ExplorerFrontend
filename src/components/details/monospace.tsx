import React, { useMemo } from 'react';
import { useEcho } from 'hooks/useEcho';
import { Text } from 'components/display';
import { routes } from 'cfg';
import { DetailsLinkOptions } from 'types/components';
import { Locales } from 'types/locales';

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
