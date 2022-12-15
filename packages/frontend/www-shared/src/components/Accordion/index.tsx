import { Component, JSX, JSXElement, splitProps } from 'solid-js';
import './index.css';

export interface AccordionProps
  extends JSX.DetailsHtmlAttributes<HTMLDetailsElement> {
  text: JSXElement | string;
  disabled?: boolean;
  expandable?: boolean;
}

export const Accordion: Component<AccordionProps> = (props) => {
  const [local, rest] = splitProps(props, [
    'text',
    'children',
    'classList',
    'disabled',
    'onClick',
    'expandable',
  ]);

  const onClick: AccordionProps['onClick'] = (event) => {
    if (props.disabled || props.expandable === false) {
      event.preventDefault();
      return;
    }

    if (typeof local.onClick === 'function') {
      local.onClick(event);
    } else {
      local.onClick?.[0](local.onClick?.[1], event);
    }
  };

  return (
    <details
      {...rest}
      classList={{
        ...local.classList,
        accordion: true,
        disabled: local.disabled,
        'not-expandable': local.expandable === false,
      }}
      onClick={onClick}
    >
      <summary>{local.text}</summary>
      {props.children}
    </details>
  );
};
