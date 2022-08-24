import React from 'react';
import { useRouter } from 'next/router';
import { AddressesList } from 'components/list';

export const DaoMembers = () => {
  const { query } = useRouter();

  return <AddressesList _organization_name={query?.id as string | undefined} />;
};
