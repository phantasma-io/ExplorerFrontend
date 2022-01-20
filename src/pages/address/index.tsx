import React from 'react';
import type { NextPage } from 'next';
import { ViewPage } from '../../containers/ViewPage';
import { ViewAddress } from '../../containers/ViewAddress';

export const AddressPage: NextPage = () => (
  <ViewPage title="title-address">
    <ViewAddress />
  </ViewPage>
);

export default AddressPage;
