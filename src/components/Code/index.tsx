import { Component, JSX } from 'solid-js';

export interface CodeProps extends JSX.HTMLAttributes<HTMLElement> {}

export const Code: Component<CodeProps> = (props) => (
  <pre>
    <code {...props} />
  </pre>
);
