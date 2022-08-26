import React from 'react';
import { Story, Meta } from '@storybook/react';
import { EventActivity, EventActivityProps } from '.';

export default {
  title: 'Components/Display/EventActivity',
  component: EventActivity,
  parameters: {
    componentSubtitle: 'EventActivity',
  },
} as Meta;

export const Default: Story<EventActivityProps> = (args) => (
  <EventActivity
    {...args}
    data={[
      {
        event_id: 6498349,
        chain: 'main',
        date: '1661325511',
        transaction_hash:
          'FC5EF6D89A7F5E974F8A6C9AD44F34BAE05264F2EA6D3F8730DB137D6B8E7325',
        token_id: '160000000',
        event_kind: 'TokenStake',
        address: 'P2KFaofJcD3VYAyQuJ7ZVDuo3nJjKi1yHPXadmb86gEZsXo',
        address_name: 'goati_gas',
        contract: {
          name: 'KCAL',
          hash: 'KCAL',
          symbol: 'KCAL',
        },
        token_event: {
          token: {
            symbol: 'KCAL',
            fungible: true,
            transferable: false,
            finite: false,
            divisible: false,
            fuel: false,
            stakable: false,
            fiat: false,
            swappable: false,
            burnable: false,
            decimals: 10,
          },
          value: '160000000',
          chain_name: 'main',
        },
      },
      {
        event_id: 6498350,
        chain: 'main',
        date: '1661325511',
        transaction_hash:
          'FC5EF6D89A7F5E974F8A6C9AD44F34BAE05264F2EA6D3F8730DB137D6B8E7325',
        event_kind: 'GasEscrow',
        address: 'P2KFaofJcD3VYAyQuJ7ZVDuo3nJjKi1yHPXadmb86gEZsXo',
        address_name: 'goati_gas',
        contract: {
          name: 'gas',
          hash: 'gas',
        },
        gas_event: {
          price: '100000',
          amount: '1600',
          address: {
            address: 'S3d7TbZxtNPdXy11hfmBLJLYn67gZTG2ibL7fJBcVdihWU4',
            address_name: 'main',
          },
        },
      },
      {
        event_id: 6498351,
        chain: 'main',
        date: '1661325511',
        transaction_hash:
          'FC5EF6D89A7F5E974F8A6C9AD44F34BAE05264F2EA6D3F8730DB137D6B8E7325',
        token_id: '212000',
        event_kind: 'TokenSend',
        address: 'P2KAPiHoaW4hp5b8wSUC1tojrihdRR56FU8tPoNVmNVDPYp',
        contract: {
          name: 'GOATI',
          hash: 'GOATI',
          symbol: 'GOATI',
        },
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
      },
      {
        event_id: 6498352,
        chain: 'main',
        date: '1661325511',
        transaction_hash:
          'FC5EF6D89A7F5E974F8A6C9AD44F34BAE05264F2EA6D3F8730DB137D6B8E7325',
        event_kind: 'GasPayment',
        address: 'P2KFaofJcD3VYAyQuJ7ZVDuo3nJjKi1yHPXadmb86gEZsXo',
        address_name: 'goati_gas',
        contract: {
          name: 'gas',
          hash: 'gas',
        },
        gas_event: {
          price: '100000',
          amount: '381',
          address: {
            address: 'S3d7TbZxtNPdXy11hfmBLJLYn67gZTG2ibL7fJBcVdihWU4',
            address_name: 'main',
          },
        },
      },
      {
        event_id: 6498353,
        chain: 'main',
        date: '1661325511',
        transaction_hash:
          'FC5EF6D89A7F5E974F8A6C9AD44F34BAE05264F2EA6D3F8730DB137D6B8E7325',
        token_id: '121900000',
        event_kind: 'TokenClaim',
        address: 'P2KFaofJcD3VYAyQuJ7ZVDuo3nJjKi1yHPXadmb86gEZsXo',
        address_name: 'goati_gas',
        contract: {
          name: 'KCAL',
          hash: 'KCAL',
          symbol: 'KCAL',
        },
        token_event: {
          token: {
            symbol: 'KCAL',
            fungible: true,
            transferable: false,
            finite: false,
            divisible: false,
            fuel: false,
            stakable: false,
            fiat: false,
            swappable: false,
            burnable: false,
            decimals: 10,
          },
          value: '121900000',
          chain_name: 'main',
        },
      },
      {
        event_id: 6498354,
        chain: 'main',
        date: '1661325511',
        transaction_hash:
          'FC5EF6D89A7F5E974F8A6C9AD44F34BAE05264F2EA6D3F8730DB137D6B8E7325',
        token_id: '19000000',
        event_kind: 'TokenBurn',
        address: 'S3d9nBL5LAUFhQ14Wzyb3JJRrXXB6atUuoL1uibkT3bttjw',
        address_name: 'gas',
        contract: {
          name: 'KCAL',
          hash: 'KCAL',
          symbol: 'KCAL',
        },
        token_event: {
          token: {
            symbol: 'KCAL',
            fungible: true,
            transferable: false,
            finite: false,
            divisible: false,
            fuel: false,
            stakable: false,
            fiat: false,
            swappable: false,
            burnable: false,
            decimals: 10,
          },
          value: '19000000',
          chain_name: 'main',
        },
      },
      {
        event_id: 6498355,
        chain: 'main',
        date: '1661325511',
        transaction_hash:
          'FC5EF6D89A7F5E974F8A6C9AD44F34BAE05264F2EA6D3F8730DB137D6B8E7325',
        token_id: '9500000',
        event_kind: 'CrownRewards',
        address: 'P2KFaofJcD3VYAyQuJ7ZVDuo3nJjKi1yHPXadmb86gEZsXo',
        address_name: 'goati_gas',
        contract: {
          name: 'KCAL',
          hash: 'KCAL',
          symbol: 'KCAL',
        },
        token_event: {
          token: {
            symbol: 'KCAL',
            fungible: true,
            transferable: false,
            finite: false,
            divisible: false,
            fuel: false,
            stakable: false,
            fiat: false,
            swappable: false,
            burnable: false,
            decimals: 10,
          },
          value: '9500000',
          chain_name: 'main',
        },
      },
      {
        event_id: 6498356,
        chain: 'main',
        date: '1661325511',
        transaction_hash:
          'FC5EF6D89A7F5E974F8A6C9AD44F34BAE05264F2EA6D3F8730DB137D6B8E7325',
        token_id: '9600000',
        event_kind: 'TokenClaim',
        address: 'S3dBVkyE9kdfbBjh7HMEr1BfPTg53CeSWaj3srYzBTZ4vyK',
        address_name: 'block',
        contract: {
          name: 'KCAL',
          hash: 'KCAL',
          symbol: 'KCAL',
        },
        token_event: {
          token: {
            symbol: 'KCAL',
            fungible: true,
            transferable: false,
            finite: false,
            divisible: false,
            fuel: false,
            stakable: false,
            fiat: false,
            swappable: false,
            burnable: false,
            decimals: 10,
          },
          value: '9600000',
          chain_name: 'main',
        },
      },
      {
        event_id: 6498357,
        chain: 'main',
        date: '1661325511',
        transaction_hash:
          'FC5EF6D89A7F5E974F8A6C9AD44F34BAE05264F2EA6D3F8730DB137D6B8E7325',
        token_id: '212000',
        event_kind: 'TokenReceive',
        address: 'P2K3oePWvffLvBG5BsuRs8mZBht7qDZvn8oG5cuyk8LYrpi',
        contract: {
          name: 'GOATI',
          hash: 'GOATI',
          symbol: 'GOATI',
        },
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
      },
    ]}
  />
);
