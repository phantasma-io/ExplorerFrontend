import { useEffect } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { routes } from 'cfg';

const Page: NextPage = () => {
  const { push, query } = useRouter();

  useEffect(() => {
    if (query.id) {
      push({
        pathname: routes['/address']('en'),
        query: {
          id: query.id,
        },
      });
    }
  }, [query, push]);

  return null;
};

export default Page;
