import React from 'react';
import type { NextPage } from 'next';
import { ViewPage } from '../../containers/ViewPage';
import { ViewBlock } from '../../containers/ViewBlock';

export const BlockPage: NextPage = () => (
  <ViewPage title="title-block">
    <ViewBlock />
  </ViewPage>
);

export default BlockPage;
