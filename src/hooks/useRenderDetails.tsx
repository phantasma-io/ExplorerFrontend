import React, { useCallback } from 'react';
import {
  DetailsBoolean,
  DetailsDate,
  DetailsMonospace,
  DetailsNumber,
  DetailsText,
  DetailsScript,
} from 'components/details';
import { DetailsItem, DetailsValue } from 'types/components';

type RenderDetails = (
  type: DetailsItem['type'],
  value: DetailsValue,
  label?: string,
  linkOptions?: DetailsItem['linkOptions'],
  inTable?: boolean,
) => JSX.Element | null;

export const useRenderDetails = () => {
  const renderDetails = useCallback<RenderDetails>(
    (type, value, label, linkOptions, inTable) => {
      if (value) {
        switch (type) {
          case 'boolean':
            return <DetailsBoolean value={value as boolean} label={label} />;
          case 'date':
            return inTable ? (
              <DetailsDate value={value as Date} label={label} short />
            ) : (
              <DetailsDate value={value as Date} label={label} />
            );
          case 'number':
            return <DetailsNumber value={value as number} label={label} />;
          case 'script':
            return <DetailsScript value={value as string} label={label} />;
          case 'monospace':
            return (
              <DetailsMonospace
                value={value as string}
                label={label}
                linkOptions={linkOptions}
              />
            );
          case 'text':
          default:
            return <DetailsText value={value as string} label={label} />;
        }
      }
      return null;
    },
    [],
  );
  return renderDetails;
};
