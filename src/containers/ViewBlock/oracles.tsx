import React from 'react';
import { OraclesList } from 'components/list';

export interface BlockOracles {
  hash?: string;
}

export const BlockOracles = ({ hash }: BlockOracles) => {
  return <OraclesList block_hash={hash} />;
};
