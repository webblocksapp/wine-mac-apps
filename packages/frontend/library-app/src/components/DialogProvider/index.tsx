import {
  Component,
  createContext,
  createUniqueId,
  For,
  JSXElement,
  useContext,
} from 'solid-js';
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
  configDialog: (id: Id, config: Partial<DialogProps>) => {
    id;
    config;
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

  const createDialog = (props: DialogProps = {}) => {
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

  const configDialog = (id: Id, config: Partial<DialogProps>) => {
    const index = store.dialogsProps.findIndex((item) => item.id == id);
    setStore('dialogsProps', index, (dialogProps) => ({
      ...dialogProps,
      ...config,
    }));
  };

  return (
    <DialogContext.Provider
      value={{ createDialog, destroyDialog, configDialog }}
    >
      {props.children}
      <Box>
        <For each={store.dialogsProps}>
          {(dialogProps) => <Dialog {...dialogProps} />}
        </For>
      </Box>
    </DialogContext.Provider>
  );
};
