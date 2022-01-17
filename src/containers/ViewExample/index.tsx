import React from 'react';
import { ExampleComponent } from '../../components/Example/example';

/**
 * ViewExampleProps
 */
interface ViewExampleProps {
  text: string;
}

/**
 * ViewExample
 */
export const ViewExample = ({ text }: ViewExampleProps) => (
  <div>
    <ExampleComponent text={text} />
  </div>
);
