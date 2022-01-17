import React from 'react';
import type { NextPage } from 'next';
import { ViewExample } from '../../containers/ViewExample';

export const ExamplePage: NextPage = () => (
  <ViewExample text="Hello World from Nebula" />
);

export default ExamplePage;
