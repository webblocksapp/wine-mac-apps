import { Component, JSX } from 'solid-js';
import './index.css';

export interface CodeProps extends JSX.HTMLAttributes<HTMLElement> {}

export const Code: Component<CodeProps> = (props) => (
  <pre class="code">
    <code {...props} />
  </pre>
);
