import React from 'react';
import { useRouter } from 'next/router';
import { TransactionsList } from 'components/list';

export const BlockTransactions = () => {
  const { query } = useRouter();

  return <TransactionsList block={query?.id as string | undefined} />;
};
