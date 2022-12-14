import { Box, Button, useDialogContext } from '@components';
import { MAX_WIDTHS } from '@constants';
import { DeviceSize, Id } from '@interfaces';
import {
  Component,
  createEffect,
  createSignal,
  JSX,
  JSXElement,
  onCleanup,
  onMount,
  Show,
  splitProps,
} from 'solid-js';
import './index.css';

export interface DialogProps
  extends JSX.DialogHtmlAttributes<HTMLDialogElement> {
  maxWidth?: DeviceSize;
  style?: JSX.CSSProperties;
  hideClose?: boolean;
  onClose?: Function;
  onAccept?: Function;
  onCancel?: Function;
  acceptText?: string;
  cancelText?: string;
  acceptDisabled?: boolean;
  cancelDisabled?: boolean;
  content?: (args: { dialogId?: Id }) => JSXElement | string;
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
    const dialogs = document.getElementsByClassName('dialog-component') || [];
    if (dialogs.length <= 1) body.style.overflow = 'auto';
  });

  return (
    <dialog
      {...rest}
      classList={{ ...local.classList, dialog: true, 'dialog-component': true }}
      open={open()}
    >
      <article
        style={{
          'max-width': `${MAX_WIDTHS[local.maxWidth || 'md']}px`,
          width: '100%',
          ...local.style,
        }}
      >
        <Show when={!props.hideClose}>
          <a aria-label="Close" class="close" onClick={close}></a>
        </Show>
        <Box>{local?.content?.({ dialogId: props.id })}</Box>
        <footer>
          <Show when={props.onCancel}>
            <Button
              variant="outline"
              color="secondary"
              onClick={onCancel}
              disabled={props.cancelDisabled}
            >
              {props.cancelText || 'Cancel'}
            </Button>
          </Show>
          <Button
            variant="outline"
            onClick={onAccept}
            disabled={props.acceptDisabled}
          >
            {props.acceptText || 'Accept'}
          </Button>
        </footer>
      </article>
    </dialog>
  );
};
