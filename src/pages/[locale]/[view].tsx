import React from 'react';
import type {
  NextPage,
  InferGetStaticPropsType,
  GetStaticProps,
  GetStaticPaths,
} from 'next';
import { ParsedUrlQuery } from 'querystring';
import { LocalizedView } from '../../containers/LocalizedView';
import { localesKeys, Locales, routesViews } from '../../cfg';

export const getStaticPaths: GetStaticPaths = async () => {
  const paths: (
    | string
    | {
        params: ParsedUrlQuery;
        locale?: string | undefined;
      }
  )[] = [];

  routesViews.forEach((view) => {
    if (view !== '') {
      localesKeys.forEach((locale) => {
        paths.push({
          params: {
            locale,
            view,
          },
        });
      });
    }
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const locale: Locales = context?.params?.locale as Locales;
  const view = context?.params?.view;
  const route = `/${view}`;
  return {
    props: { locale, route },
  };
};

const HomePage: NextPage = ({
  locale,
  route,
}: InferGetStaticPropsType<typeof getStaticProps>) => (
  <LocalizedView locale={locale} route={route} />
);

export default HomePage;
