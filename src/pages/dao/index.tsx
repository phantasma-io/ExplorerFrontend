import React from 'react';
import type { NextPage } from 'next';
import { ViewPage } from '../../containers/ViewPage';
import { ViewDao } from '../../containers/ViewDao';

export const DaoPage: NextPage = () => (
  <ViewPage title="title-dao">
    <ViewDao />
  </ViewPage>
);

export default DaoPage;
