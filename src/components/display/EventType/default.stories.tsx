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

export const String: Story<EventTypeProps> = (args) => (
  <EventType
    {...args}
    data={{
      event_id: 1,
      event_kind: 'ContractDeploy',
      string_event: {
        string_value: 'ASDASDASDASDASDA',
      },
    }}
  />
);

export const Sale: Story<EventTypeProps> = (args) => (
  <EventType
    {...args}
    data={{
      event_id: 1,
      event_kind: 'Crowdsale',
      sale_event: {
        hash: 'ASDASDASDASDASDA',
      },
    }}
  />
);

export const Dao: Story<EventTypeProps> = (args) => (
  <EventType
    {...args}
    data={{
      event_id: 1,
      event_kind: 'OrganizationAdd',
      organization_event: {
        organization: { name: 'ORG' },
        address: { address: 'ASDASDSADSAD' },
      },
    }}
  />
);

export const Market: Story<EventTypeProps> = (args) => (
  <EventType
    {...args}
    data={{
      event_id: 1,
      event_kind: 'OrderBid',
      market_event: {
        base_token: { symbol: 'SOUL' },
        quote_token: { symbol: 'KCAL' },
        price: '404',
        end_price: '1337',
      },
    }}
  />
);

export const Infusion: Story<EventTypeProps> = (args) => (
  <EventType
    {...args}
    data={{
      event_id: 1,
      event_kind: 'Infusion',
      infusion_event: {
        token_id: '1337',
        infused_value: '404',
        base_token: { symbol: 'SOUL' },
        infused_token: { symbol: 'KCAL' },
      },
    }}
  />
);

export const Hash: Story<EventTypeProps> = (args) => (
  <EventType
    {...args}
    data={{
      event_id: 1,
      event_kind: 'FileCreate',
      hash_event: {
        hash: 'ASDSADSADSADSADA',
      },
    }}
  />
);

export const Gas: Story<EventTypeProps> = (args) => (
  <EventType
    {...args}
    data={{
      event_id: 1,
      event_kind: 'GasPayment',
      gas_event: {
        price: '1337',
        amount: '404',
        address: {
          address: 'ASDASDASDASASDSADSADSADSADAD',
        },
      },
    }}
  />
);

export const Address: Story<EventTypeProps> = (args) => (
  <EventType
    {...args}
    data={{
      event_id: 1,
      event_kind: 'ValidatorElect',
      address_event: {
        address: 'P2K3oePWvffLvBG5BsuRs8mZBht7qDZvn8oG5cuyk8LYrpi',
        validator_kind: 'Invalid',
        stake: '0',
        unclaimed: '0',
        relay: '0',
        storage: {
          available: 0,
          used: 0,
          avatar:
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAAJFBMVEWcnJz////39/etra3e3t6lpaW1tbXn5+fW1tbv7+/Ozs69vb2ss4cPAAAAk0lEQVQoz2OgJWA2QOWnKAqVIfM5BIGgAUlgIUhAAsFnEwSDBLgAC0SgAC7ABBEQhQsYQgSEMQRwa2GHGopu7QaEQxpBfBF0pzsg+3WioKAkkn9ZHcFaAuACRhBDleEaFCECQjBNQYJQoAoVcIQJiCA5Cx4iCIcjHB+IEBCFBigcSMHMRDV1IkJAEiygiBAQYmAAABD5F4JgcTScAAAAAElFTkSuQmCC',
        },
        stakes: { amount: '0', time: 0, unclaimed: '0' },
        balances: [
          {
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
            chain: { chain_name: 'main' },
            amount: '212',
          },
        ],
      },
    }}
  />
);

export const Chain: Story<EventTypeProps> = (args) => (
  <EventType
    {...args}
    data={{
      event_id: 1,
      event_kind: 'ValueCreate',
      chain_event: {
        name: 'Test Chain Event Name',
        value: '1337',
        chain: {
          chain_name: 'Test Chain Name',
          chain_height: '404',
        },
      },
    }}
  />
);

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
