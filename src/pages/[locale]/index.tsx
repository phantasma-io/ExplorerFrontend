import React from 'react';
import type {
  NextPage,
  InferGetStaticPropsType,
  GetStaticProps,
  GetStaticPaths,
} from 'next';
import { LocalizedView } from 'containers/LocalizedView';
import { localesKeys } from 'cfg';
import { Locales } from 'types/locales';
import { ExplorerRoutes } from 'types/routes';
import { I18nProvider } from 'containers/I18nProvider';

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
  <I18nProvider locale={locale}>
    <LocalizedView locale={locale} route={route} />
  </I18nProvider>
);

export default HomePage;
