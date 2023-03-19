import { Box } from '@components';
import { Component, JSX, JSXElement, Show, splitProps } from 'solid-js';
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
    if (
      props.disabled ||
      props.expandable === false ||
      props.children === undefined
    ) {
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
      <summary>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          {local.text}
          <Show when={local.expandable !== false && local.disabled !== true}>
            <Box class="icon"></Box>
          </Show>
        </Box>
      </summary>
      {props.children}
    </details>
  );
};
