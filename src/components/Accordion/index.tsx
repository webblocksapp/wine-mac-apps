import { Component, JSX, splitProps } from 'solid-js';
import './index.css';

export interface AccordionProps
  extends JSX.DetailsHtmlAttributes<HTMLDetailsElement> {
  text: string;
}

export const Accordion: Component<AccordionProps> = (props) => {
  const [local, rest] = splitProps(props, ['text', 'children', 'classList']);
  return (
    <details {...rest} classList={{ ...local.classList, accordion: true }}>
      <summary>{local.text}</summary>
      {props.children}
    </details>
  );
};
