import {
  Component,
  createContext,
  createUniqueId,
  For,
  JSXElement,
  useContext,
} from 'solid-js';
import { Portal } from 'solid-js/web';
import { createStore } from 'solid-js/store';
import { Box, Dialog, DialogProps } from '@components';
import { Id } from '@interfaces';

const DialogContext = createContext({
  createDialog: (props?: DialogProps) => {
    props;
  },
  destroyDialog: (id: Id) => {
    id;
  },
});

export const useDialogContext = () => useContext(DialogContext);

export interface DialogProviderProps {
  children?: JSXElement;
}

export const DialogProvider: Component<DialogProviderProps> = (props) => {
  const [store, setStore] = createStore<{
    dialogsProps: Array<DialogProps>;
  }>({
    dialogsProps: [],
  });

  const createDialog = (props?: DialogProps) => {
    const id = createUniqueId();
    setStore('dialogsProps', (dialogsProps) => [
      ...dialogsProps,
      { ...props, id },
    ]);
  };

  const destroyDialog = (id: Id) => {
    setStore('dialogsProps', (dialogsProps) => {
      return dialogsProps.filter((dialogProps) => dialogProps.id !== id) || [];
    });
  };

  return (
    <DialogContext.Provider value={{ createDialog, destroyDialog }}>
      {props.children}
      <Box>
        <For each={store.dialogsProps}>
          {(dialogProps) => (
            <Portal>
              <Dialog {...dialogProps} />
            </Portal>
          )}
        </For>
      </Box>
    </DialogContext.Provider>
  );
};
