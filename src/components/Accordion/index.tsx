import { Component, JSX, splitProps } from 'solid-js';

export interface AccordionProps
  extends JSX.DetailsHtmlAttributes<HTMLDetailsElement> {
  text: string;
}

export const Accordion: Component<AccordionProps> = (props) => {
  const [local, rest] = splitProps(props, ['text', 'children']);
  return (
    <details {...rest}>
      <summary>{local.text}</summary>
      {props.children}
    </details>
  );
};
