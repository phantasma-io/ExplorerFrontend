import React from 'react';
import { useRouter } from 'next/router';
import { EventsList } from 'components/list';

export const BlockEvents = () => {
  const { query } = useRouter();

  return <EventsList block={query?.id as string | undefined} />;
};
