import React from 'react';
import type { NextPage } from 'next';
import { ViewPage } from '../../containers/ViewPage';
import { ViewChain } from '../../containers/ViewChain';

export const ChainPage: NextPage = () => (
  <ViewPage title="title-chain">
    <ViewChain />
  </ViewPage>
);

export default ChainPage;
