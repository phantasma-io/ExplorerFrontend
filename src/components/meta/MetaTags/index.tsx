import React from 'react';
import Head from 'next/head';

export const MetaTags = () => {
  return (
    <Head>
      <meta name="viewport" content="initial-scale=1, width=device-width" />

      <meta name="theme-color" content={'#17b1e8'} />

      <meta property="og:image" content={'/static/v1/img/explorer-ogimg.png'} />

      <link rel="icon" type="image/png" href={'/static/v1/img/soul.png'} />

      <meta name="author" content="Phantasma Team" />

      <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
    </Head>
  );
};
