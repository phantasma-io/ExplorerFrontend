import React from 'react';
import type { NextPage } from 'next';
import { ViewPage } from '../../containers/ViewPage';
import { ViewContract } from '../../containers/ViewContract';

export const ContractPage: NextPage = () => (
  <ViewPage title="title-contract">
    <ViewContract />
  </ViewPage>
);

export default ContractPage;
