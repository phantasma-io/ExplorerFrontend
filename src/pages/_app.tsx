import React from 'react';
import { AppProps } from 'next/app';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { AppProvider } from 'containers';
import { createEmotionCache } from 'scripts';
import { Locales } from 'types/locales';

const clientSideEmotionCache = createEmotionCache();

interface ExplorerAppProps extends AppProps {
  emotionCache: EmotionCache;
}

const ExplorerApp = ({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}: ExplorerAppProps) => (
  <CacheProvider value={emotionCache}>
    <AppProvider locale={(pageProps as { locale?: Locales }).locale}>
      <Component {...pageProps} />
    </AppProvider>
  </CacheProvider>
);

export default ExplorerApp;
