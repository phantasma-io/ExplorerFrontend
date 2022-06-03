import React, { useCallback } from 'react';
import {
  DetailsBoolean,
  DetailsDate,
  DetailsMonospace,
  DetailsNumber,
  DetailsText,
  DetailsScript,
  DetailsThumbnail,
} from 'components/details';
import { DetailsItem, DetailsValue } from 'types/components';
import { parseIpfs } from 'scripts';

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
          case 'thumbnail': {
            const { thumb, link } = parseIpfs(value as string);
            return <DetailsThumbnail thumb={thumb} link={link} />;
          }
          case 'thumbnail-mini': {
            const { thumb, link } = parseIpfs(value as string);
            return <DetailsThumbnail thumb={thumb} link={link} mini />;
          }
          case 'boolean':
            return (
              <DetailsBoolean
                value={value as boolean}
                label={label}
                height={inTable ? undefined : '30px'}
              />
            );
          case 'date':
            return inTable ? (
              <DetailsDate
                value={value as Date}
                label={label}
                short
                height={inTable ? undefined : '30px'}
              />
            ) : (
              <DetailsDate
                value={value as Date}
                label={label}
                height={inTable ? undefined : '30px'}
              />
            );
          case 'number':
            return (
              <DetailsNumber
                value={value as number}
                label={label}
                height={inTable ? undefined : '30px'}
              />
            );
          case 'script':
            return (
              <DetailsScript
                value={value as string}
                label={label}
                height={inTable ? undefined : '30px'}
              />
            );
          case 'monospace':
            return (
              <DetailsMonospace
                value={value as string}
                label={label}
                linkOptions={linkOptions}
                height={inTable ? undefined : '30px'}
              />
            );
          case 'text':
          default:
            return (
              <DetailsText
                value={value as string}
                label={label}
                linkOptions={linkOptions}
                height={inTable ? undefined : '30px'}
              />
            );
        }
      }
      return null;
    },
    [],
  );
  return renderDetails;
};
