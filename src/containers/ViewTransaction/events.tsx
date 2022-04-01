import React from 'react';
import { useRouter } from 'next/router';
import { EventsList } from 'components/list';

export const TransactionEvents = () => {
  const { query } = useRouter();

  return <EventsList transaction={query?.id as string | undefined} />;
};
