import { Component, JSXElement, Show } from 'solid-js';

export interface WrapProps {
  children?: JSXElement;
  with: (children: JSXElement) => JSXElement;
  when: boolean;
}

export const Wrap: Component<WrapProps> = (props) => {
  return (
    <Show when={props.when} fallback={props.children}>
      {props.with(props.children)}
    </Show>
  );
};
