import React, { ReactNode } from 'react';
import { AppProps } from 'next/app';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { AppProvider } from '../containers/AppProvider';
import { createEmotionCache } from '../scripts/createEmotionCache';

const clientSideEmotionCache = createEmotionCache();

interface ExplorerAppProps extends AppProps {
  emotionCache: EmotionCache;
}

const ExplorerApp: ReactNode = ({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}: ExplorerAppProps) => (
  <CacheProvider value={emotionCache}>
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  </CacheProvider>
);

export default ExplorerApp;
