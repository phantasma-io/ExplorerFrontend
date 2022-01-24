import React from 'react';
import Head from 'next/head';
import { usePain } from '@ricardo-jrm/pain';
import { useEcho } from '@ricardo-jrm/echo';

export const MetaTags = () => {
  const { painActive } = usePain();
  const { echo } = useEcho();

  return (
    <Head>
      <meta name="viewport" content="initial-scale=1, width=device-width" />

      <meta name="theme-color" content={'#17b1e8'} />

      <title>Phantasma Chain Explorer</title>
      <meta property="og:title" content="Phantasma Chain Explorer" />

      {painActive?.description && (
        <meta
          name="description"
          content={echo(painActive?.description as string)}
        />
      )}

      {painActive?.description && (
        <meta
          property="og:description"
          content={echo(painActive?.description as string)}
        />
      )}

      <meta property="og:image" content={'/static/v1/img/explorer-ogimg.png'} />

      <link rel="icon" type="image/png" href={'/static/v1/img/soul.png'} />

      <meta name="author" content="Phantasma Team" />

      <meta httpEquiv="X-UA-Compatible" content="ie=edge" />

      <link rel="preconnect" href="https://fonts.googleapis.com" />

      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="crossorigin"
      />

      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
        rel="stylesheet"
      />
    </Head>
  );
};
