import React, { ReactNode } from 'react';
import { AppProps } from 'next/app';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { AppProvider } from '../containers/AppProvider';
import { AppLayout } from '../containers/AppLayout';
import { createEmotionCache } from '../scripts/createEmotionCache';

const clientSideEmotionCache = createEmotionCache();

interface NebulaAppProps extends AppProps {
  emotionCache: EmotionCache;
}

const NebulaApp: ReactNode = ({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}: NebulaAppProps) => (
  <CacheProvider value={emotionCache}>
    <AppProvider>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </AppProvider>
  </CacheProvider>
);

export default NebulaApp;
