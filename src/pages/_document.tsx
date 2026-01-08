/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';
import createEmotionServer from '@emotion/server/create-instance';
import { createEmotionCache } from 'scripts';
import { localesDefault, localesKeys } from 'cfg';
import { Locales } from 'types/locales';

type DocumentExtraProps = {
  locale: Locales;
};

const normalizeLocale = (value: string | string[] | undefined) => {
  if (!value) return null;
  const candidate = Array.isArray(value) ? value[0] : value;
  return localesKeys.includes(candidate as Locales)
    ? (candidate as Locales)
    : null;
};

const localeFromPath = (path: string | undefined) => {
  if (!path) return null;
  const base = path.split('?')[0]?.split('#')[0] ?? '';
  const segment = base.split('/')[1];
  return normalizeLocale(segment);
};

export default class MyDocument extends Document<DocumentExtraProps> {
  public render() {
    const { locale } = this.props;
    return (
      <Html lang={locale ?? localesDefault}>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  const originalRenderPage = ctx.renderPage;

  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  ctx.renderPage = () =>
    originalRenderPage({
      // eslint-disable-next-line react/display-name
      enhanceApp: (App: any) => (props) =>
        <App emotionCache={cache} {...props} />,
    });

  const initialProps = await Document.getInitialProps(ctx);
  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));
  // HTML lang drives native datetime-local formatting, so align with UI locale.
  const locale =
    normalizeLocale(ctx.query?.locale) ||
    localeFromPath(ctx.req?.url ?? ctx.asPath) ||
    localesDefault;

  return {
    ...initialProps,
    locale,
    styles: [
      ...React.Children.toArray(initialProps.styles),
      ...emotionStyleTags,
    ],
  };
};
