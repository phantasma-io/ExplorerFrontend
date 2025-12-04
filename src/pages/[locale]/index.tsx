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
  route,
}: InferGetStaticPropsType<typeof getStaticProps>) => (
  <LocalizedView route={route} />
);

export default HomePage;
