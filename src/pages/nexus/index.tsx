import React from 'react';
import type { NextPage } from 'next';
import { ViewPage } from '../../containers/ViewPage';
import { ViewNexus } from '../../containers/ViewNexus';

export const NexusPage: NextPage = () => (
  <ViewPage title="title-nexus">
    <ViewNexus />
  </ViewPage>
);

export default NexusPage;
