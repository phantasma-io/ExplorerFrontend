import React from 'react';
import Head from 'next/head';

export interface MetaDynamicProps {
  title: string;
  description: string;
}

export const MetaDynamic = ({ title, description }: MetaDynamicProps) => {
  return (
    <Head>
      <title>{title}</title>
      <meta property="og:title" content={title} />

      <meta name="description" content={description} />
      <meta property="og:description" content={description} />
    </Head>
  );
};
