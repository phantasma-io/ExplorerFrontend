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
  width?: string;
}

/**
 * Image
 */
export const Image = ({
  src,
  title,
  alt,
  height,
  width,
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
          width: width || 'auto',
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
        width: width || undefined,
        ...style,
      }}
    />
  );
};
