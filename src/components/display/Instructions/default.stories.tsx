import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Instructions, InstructionsProps } from '.';

export default {
  title: 'Components/Display/Instructions',
  component: Instructions,
  parameters: {
    componentSubtitle: 'Instructions',
  },
} as Meta;

export const Default: Story<InstructionsProps> = (args) => (
  <Instructions
    {...args}
    data={{
      total_results: 43,
      instructions: [
        { instruction: '000: NOP' },
        { instruction: '001: LOAD r0, "farms"' },
        { instruction: '010: PUSH r0' },
        { instruction: '012: LOAD r0, "Map.Clear"' },
        { instruction: '025: EXTCALL r0' },
        { instruction: '027: LOAD r0, "distribution"' },
        { instruction: '043: PUSH r0' },
        { instruction: '045: LOAD r0, "Map.Clear"' },
        { instruction: '058: EXTCALL r0' },
        { instruction: '060: LOAD r0, "times"' },
        { instruction: '069: PUSH r0' },
        { instruction: '071: LOAD r0, "Map.Clear"' },
        { instruction: '084: EXTCALL r0' },
        { instruction: '086: LOAD r0, "timesDistributed"' },
        { instruction: '106: PUSH r0' },
        { instruction: '108: LOAD r0, "Map.Clear"' },
        { instruction: '121: EXTCALL r0' },
        { instruction: '123: LOAD r0, "farmUserTotalAmount"' },
        { instruction: '146: PUSH r0' },
        { instruction: '148: LOAD r0, "Map.Clear"' },
        { instruction: '161: EXTCALL r0' },
        { instruction: '163: LOAD r0, "claimed"' },
        { instruction: '174: PUSH r0' },
        { instruction: '176: LOAD r0, "Map.Clear"' },
        { instruction: '189: EXTCALL r0' },
        { instruction: '191: LOAD r0, "unclaimed"' },
        { instruction: '204: PUSH r0' },
        { instruction: '206: LOAD r0, "Map.Clear"' },
        { instruction: '219: EXTCALL r0' },
        { instruction: '221: POP r2' },
        { instruction: '223: PUSH r2' },
        { instruction: '225: LOAD r0, "Address()"' },
        { instruction: '238: EXTCALL r0' },
        { instruction: '240: POP r2' },
        { instruction: '242: COPY r2, r3' },
        { instruction: '245: COPY r3, r1' },
        { instruction: '248: NOP' },
        { instruction: '249: LOAD r2, "Data.Set"' },
        { instruction: '261: PUSH r1' },
        { instruction: '263: LOAD r0, "manager"' },
        { instruction: '274: PUSH r0' },
        { instruction: '276: EXTCALL r2' },
        { instruction: '278: RET' },
      ],
    }}
  />
);
