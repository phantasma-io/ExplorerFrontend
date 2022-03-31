import React from 'react';
import { useRouter } from 'next/router';
import { EventsList } from 'components/list';

export const AddressEvents = () => {
  const { query } = useRouter();

  return <EventsList address={query?.id as string | undefined} />;
};
