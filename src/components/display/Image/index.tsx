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
  maxHeight?: string;
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
  maxHeight,
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
          width: width || 'auto',
          height: height || 'auto',
          maxHeight: maxHeight || 'auto',
          maxWidth: '100%',
          userSelect: 'none',
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
        userSelect: 'none',
        ...style,
      }}
    />
  );
};
