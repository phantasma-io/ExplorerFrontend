import React from 'react';
import type {
  NextPage,
  InferGetStaticPropsType,
  GetStaticProps,
  GetStaticPaths,
} from 'next';
import { EchoProvider } from '@ricardo-jrm/echo';
import { LocalizedView } from '../../containers/LocalizedView';
import { locales, localesKeys, Locales, ExplorerRoutes } from '../../cfg';

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = localesKeys.map((key) => ({
    params: { locale: key },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const locale: Locales = context?.params?.locale as Locales;
  const route: ExplorerRoutes = `/`;
  return {
    props: { locale, route },
  };
};

const HomePage: NextPage = ({
  locale,
  route,
}: InferGetStaticPropsType<typeof getStaticProps>) => (
  <EchoProvider
    echo={locales}
    echoDefault={locale}
    lsid="phantasma-explorer-locale"
  >
    <LocalizedView locale={locale} route={route} />
  </EchoProvider>
);

export default HomePage;
