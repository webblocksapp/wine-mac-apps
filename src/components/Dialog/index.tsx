import { Box, Button, useDialogContext } from '@components';
import { MAX_WIDTHS } from '@constants';
import { DeviceSize } from '@interfaces';
import {
  Component,
  createEffect,
  createSignal,
  JSX,
  JSXElement,
  onCleanup,
  onMount,
  splitProps,
} from 'solid-js';
import './index.css';

export interface DialogProps
  extends JSX.DialogHtmlAttributes<HTMLDialogElement> {
  maxWidth?: DeviceSize;
  style?: JSX.CSSProperties;
  onClose?: Function;
  onAccept?: Function;
  onCancel?: Function;
  acceptText?: string;
  cancelText?: string;
  content?: JSXElement | string;
}

export const Dialog: Component<DialogProps> = (props) => {
  const [local, rest] = splitProps(props, [
    'children',
    'open',
    'style',
    'maxWidth',
    'classList',
    'onClose',
    'onAccept',
    'onCancel',
    'acceptText',
    'cancelText',
    'content',
  ]);
  const dialogContext = useDialogContext();
  const body = document.getElementsByTagName('body')[0];
  const [open, setOpen] = createSignal(true);

  const close = () => {
    props?.onClose?.();
    setOpen(false);
    destroyDialog();
  };

  const onAccept = () => {
    local?.onAccept?.();
    close();
  };

  const onCancel = () => {
    local?.onCancel?.();
    close();
  };

  const destroyDialog = () => {
    props.id && dialogContext?.destroyDialog?.(props.id);
  };

  createEffect(() => {
    setOpen(local.open ?? true);
  });

  onMount(() => {
    body.style.overflow = 'hidden';
  });

  onCleanup(() => {
    body.style.overflow = 'auto';
  });

  return (
    <dialog
      {...rest}
      classList={{ ...local.classList, dialog: true }}
      open={open()}
    >
      <article
        style={{
          'max-width': `${MAX_WIDTHS[local.maxWidth || 'md']}px`,
          width: '100%',
          ...local.style,
        }}
      >
        <a aria-label="Close" class="close" onClick={close}></a>
        <Box>{local.content}</Box>
        <footer>
          <Button variant="outline" color="secondary" onClick={onCancel}>
            {props.cancelText || 'Cancel'}
          </Button>
          <Button variant="outline" onClick={onAccept}>
            {props.acceptText || 'Accept'}
          </Button>
        </footer>
      </article>
    </dialog>
  );
};
