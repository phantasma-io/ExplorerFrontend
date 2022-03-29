import React from 'react';
import { useRouter } from 'next/router';
import { TransactionsList } from 'components/list';

export const AddressTransactions = () => {
  const { query } = useRouter();

  return <TransactionsList address={query?.id as string | undefined} />;
};
