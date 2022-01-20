import React from 'react';
import type { NextPage } from 'next';
import { ViewPage } from '../../containers/ViewPage';
import { ViewTransaction } from '../../containers/ViewTransaction';

export const TransactionPage: NextPage = () => (
  <ViewPage title="title-transaction">
    <ViewTransaction />
  </ViewPage>
);

export default TransactionPage;
