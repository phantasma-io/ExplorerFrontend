/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ImgHTMLAttributes } from 'react';

/**
 * Image props
 */
export interface ImageProps extends ImgHTMLAttributes<any> {
  src: string;
  title?: string | undefined;
  alt?: string;
  responsive?: boolean;
  height?: string;
}

/**
 * Image
 */
export const Image = ({
  src,
  title,
  alt,
  height,
  responsive,
  style,
}: ImageProps) => {
  if (responsive) {
    return (
      <img
        src={src}
        title={title}
        alt={alt}
        style={{
          height: height || 'auto',
          maxWidth: '100%',
          ...style,
        }}
      />
    );
  }

  return (
    <img
      src={src}
      title={title}
      alt={alt}
      style={{
        height: height || undefined,
        ...style,
      }}
    />
  );
};
