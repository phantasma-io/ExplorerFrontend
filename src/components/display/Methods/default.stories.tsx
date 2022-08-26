import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Methods, MethodsProps } from '.';

export default {
  title: 'Components/Display/Methods',
  component: Methods,
  parameters: {
    componentSubtitle: 'Methods',
  },
} as Meta;

export const Default: Story<MethodsProps> = (args) => (
  <Methods
    {...args}
    data={[
      {
        name: 'Initialize',
        returnType: 'None',
      },
      {
        name: 'ToLower',
        parameters: [{ name: 's', type: 'String' }],
        returnType: 'String',
      },
      {
        name: 'onUpgrade',
        parameters: [{ name: 'from', type: 'Object' }],
        returnType: 'None',
      },
      {
        name: 'onKill',
        parameters: [
          { name: 'from', type: 'Object' },
          { name: 'from', type: 'Object' },
        ],
        returnType: 'None',
      },
      {
        name: 'getKey',
        parameters: [
          { name: 'from', type: 'Object' },
          { name: 'symbol', type: 'String' },
          { name: 'pair', type: 'String' },
        ],
        returnType: 'String',
      },
      {
        name: 'getAddressList',
        parameters: [
          { name: 'symbol', type: 'String' },
          { name: 'pair', type: 'String' },
        ],
        returnType: 'String',
      },
      {
        name: 'getFarmInfo',
        parameters: [
          { name: 'symbol', type: 'String' },
          { name: 'pair', type: 'String' },
        ],
        returnType: 'Struct',
      },
      {
        name: 'setupFarm',
        parameters: [
          { name: 'symbol', type: 'String' },
          { name: 'pair', type: 'String' },
          { name: 'genSymbol', type: 'String' },
          { name: 'distributionAmount', type: 'Number' },
          { name: 'distributionFrequency', type: 'Number' },
          { name: 'dailyAmount', type: 'Number' },
        ],
        returnType: 'None',
      },
      {
        name: 'updateFarm',
        parameters: [
          { name: 'symbol', type: 'String' },
          { name: 'pair', type: 'String' },
          { name: 'genSymbol', type: 'String' },
          { name: 'distributionAmount', type: 'Number' },
          { name: 'distributionFrequency', type: 'Number' },
          { name: 'dailyAmount', type: 'Number' },
        ],
        returnType: 'None',
      },
      {
        name: 'removeFarm',
        parameters: [
          { name: 'symbol', type: 'String' },
          { name: 'pair', type: 'String' },
        ],
        returnType: 'None',
      },
      {
        name: 'reportLiquidity',
        parameters: [
          { name: 'from', type: 'Object' },
          { name: 'ETHAddress', type: 'String' },
          { name: 'BNBAddress', type: 'String' },
          { name: 'symbol', type: 'String' },
          { name: 'pair', type: 'String' },
          { name: 'amount', type: 'Number' },
        ],
        returnType: 'None',
      },
      {
        name: 'updateLiquidity',
        parameters: [
          { name: 'from', type: 'Object' },
          { name: 'symbol', type: 'String' },
          { name: 'pair', type: 'String' },
          { name: 'percent', type: 'Number' },
          { name: 'amount', type: 'Number' },
        ],
        returnType: 'None',
      },
      {
        name: 'removeLiquidity',
        parameters: [
          { name: 'from', type: 'Object' },
          { name: 'symbol', type: 'String' },
          { name: 'pair', type: 'String' },
        ],
        returnType: 'None',
      },
      {
        name: 'distribute',
        parameters: [
          { name: 'symbol', type: 'String' },
          { name: 'pair', type: 'String' },
        ],
        returnType: 'None',
      },
      {
        name: 'getUserInfo',
        parameters: [
          { name: 'from', type: 'Object' },
          { name: 'symbol', type: 'String' },
          { name: 'pair', type: 'String' },
        ],
        returnType: 'Struct',
      },
      {
        name: 'getUnclaimed',
        parameters: [
          { name: 'from', type: 'Object' },
          { name: 'symbol', type: 'String' },
          { name: 'pair', type: 'String' },
        ],
        returnType: 'Number',
      },
      {
        name: 'getClaimed',
        parameters: [
          { name: 'from', type: 'Object' },
          { name: 'symbol', type: 'String' },
          { name: 'pair', type: 'String' },
        ],
        returnType: 'Number',
      },
      {
        name: 'claim',
        parameters: [
          { name: 'from', type: 'Object' },
          { name: 'symbol', type: 'String' },
          { name: 'pair', type: 'String' },
        ],
        returnType: 'None',
      },
      {
        name: 'fixTimer',
        parameters: [
          { name: 'time', type: 'Timestamp' },
          { name: 'symbol', type: 'String' },
          { name: 'pair', type: 'String' },
        ],
        returnType: 'None',
      },
      {
        name: 'fixTimerNumber',
        parameters: [
          { name: 'time', type: 'Number' },
          { name: 'symbol', type: 'String' },
          { name: 'pair', type: 'String' },
        ],
        returnType: 'None',
      },
      {
        name: 'recoverFunds',
        parameters: [
          { name: 'from', type: 'Object' },
          { name: 'symbol', type: 'String' },
        ],
        returnType: 'None',
      },
      {
        name: 'getFarmRewards',
        parameters: [
          { name: 'symbol', type: 'String' },
          { name: 'pair', type: 'String' },
        ],
        returnType: 'Number',
      },
      {
        name: 'getTokenAmount',
        parameters: [{ name: 'symbol', type: 'String' }],
        returnType: 'Number',
      },
      {
        name: 'updateOwner',
        parameters: [{ name: 'from', type: 'Object' }],
        returnType: 'None',
      },
    ]}
  />
);
