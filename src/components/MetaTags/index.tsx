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

      {painActive?.image && (
        <meta property="og:image" content={painActive?.image} />
      )}

      {/* {painActive?.favicon && (
        <link
          rel="icon"
          type="image/png"
          href={painActive?.favicon as string}
        />
      )} */}

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
