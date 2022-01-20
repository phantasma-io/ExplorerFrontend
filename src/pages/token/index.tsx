import React from 'react';
import type { NextPage } from 'next';
import { ViewPage } from '../../containers/ViewPage';
import { ViewToken } from '../../containers/ViewToken';

export const TokenPage: NextPage = () => (
  <ViewPage title="title-token">
    <ViewToken />
  </ViewPage>
);

export default TokenPage;
