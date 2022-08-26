import React from 'react';
import { Story, Meta } from '@storybook/react';
import { EventType, EventTypeProps } from '.';

export default {
  title: 'Components/Display/EventType',
  component: EventType,
  parameters: {
    componentSubtitle: 'EventType',
  },
} as Meta;

export const Token: Story<EventTypeProps> = (args) => (
  <EventType
    {...args}
    data={{
      event_id: 6498351,
      chain: 'main',
      date: '1661325511',
      block_hash:
        '663D7E16408983ECA3E9CF02A6C94F4F5354D631F2854C376E9DEB7F9E1FD8EC',
      transaction_hash:
        'FC5EF6D89A7F5E974F8A6C9AD44F34BAE05264F2EA6D3F8730DB137D6B8E7325',
      token_id: '212000',
      event_kind: 'TokenSend',
      address: 'P2KAPiHoaW4hp5b8wSUC1tojrihdRR56FU8tPoNVmNVDPYp',
      contract: { name: 'GOATI', hash: 'GOATI', symbol: 'GOATI' },
      token_event: {
        token: {
          symbol: 'GOATI',
          fungible: true,
          transferable: false,
          finite: false,
          divisible: false,
          fuel: false,
          stakable: false,
          fiat: false,
          swappable: false,
          burnable: false,
          decimals: 3,
        },
        value: '212000',
        chain_name: 'main',
      },
    }}
  />
);
