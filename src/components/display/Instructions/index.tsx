/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Empty } from 'components/layout';
import { Text } from '../Text';

interface InstructionsResults {
  instructions: InstructionsData[];
  total_results: number;
}

interface InstructionsData {
  instruction: string;
}

/**
 * Instructions props
 */
export interface InstructionsProps {
  data?: InstructionsResults;
}

/**
 * Instructions
 */
export const Instructions = ({ data }: InstructionsProps) => {
  if (!data || data?.instructions?.length === 0) {
    return <Empty />;
  }

  if (data && data?.instructions?.length > 0) {
    return (
      <>
        {data?.instructions.map((ins) => {
          const split = ins.instruction.split(':');

          return (
            <Text
              variant="body1"
              label={split[0]}
              value={split[1]}
              paragraph
              clipboard
              spacing={1}
            />
          );
        })}
      </>
    );
  }

  return null;
};
