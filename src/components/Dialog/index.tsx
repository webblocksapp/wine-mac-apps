import { Box, Button } from '@components';
import { MAX_WIDTHS } from '@constants';
import { DeviceSize } from '@interfaces';
import { Component, JSX, onCleanup, onMount, splitProps } from 'solid-js';
import './index.css';

export interface DialogProps
  extends JSX.DialogHtmlAttributes<HTMLDialogElement> {
  maxWidth?: DeviceSize;
  style?: JSX.CSSProperties;
}

export const Dialog: Component<DialogProps> = (props) => {
  const [local, rest] = splitProps(props, [
    'children',
    'style',
    'maxWidth',
    'classList',
  ]);
  const body = document.getElementsByTagName('body')[0];

  onMount(() => {
    body.style.overflow = 'hidden';
  });

  onCleanup(() => {
    body.style.overflow = 'auto';
  });

  return (
    <dialog {...rest} classList={{ ...local.classList, dialog: true }}>
      <article
        style={{
          'max-width': `${MAX_WIDTHS[local.maxWidth || 'xxl']}px`,
          width: '100%',
          ...local.style,
        }}
      >
        <a aria-label="Close" class="close"></a>
        <Box>Hello world</Box>
        <footer>
          <Button variant="outline" color="secondary">
            Cancel
          </Button>
          <Button variant="outline">Confirm</Button>
        </footer>
      </article>
    </dialog>
  );
};
