import { Component, mergeProps, splitProps } from 'solid-js';
import { Box, TextInput, TextInputProps, Button } from 'www-shared';
import { createStore } from 'solid-js/store';
import { open } from '@tauri-apps/api/dialog';
import './index.css';

export interface FileInputProps extends Omit<TextInputProps, 'readonly'> {
  buttonText?: string;
  buttonDirection?: 'right' | 'left';
}

export const FilePathInput: Component<FileInputProps> = (props) => {
  const mergedProps = mergeProps(props, { buttonDirection: 'left' });
  const [local, rest] = splitProps(mergedProps, [
    'helperText',
    'errorMessage',
    'buttonText',
    'buttonDirection',
  ]);

  const [store, setStore] = createStore({
    value: '',
  });

  const onClick = async () => {
    const filePath = (await open()) as string;
    setStore('value', filePath);
    rest?.formHandler?.setFieldValue?.(rest.name, filePath, {
      validateOn: ['change'],
    });
  };

  return (
    <Box classList={{ 'file-path-input': true }}>
      <TextInput
        {...rest}
        readonly
        value={store.value}
        onClick={onClick}
        prevSlot={
          local.buttonDirection === 'left' && (
            <Button
              type="button"
              variant="outline"
              color="secondary"
              onClick={onClick}
            >
              {local.buttonText || 'Browse'}
            </Button>
          )
        }
        nextSlot={
          local.buttonDirection === 'right' && (
            <Button
              type="button"
              variant="outline"
              color="secondary"
              onClick={onClick}
            >
              {local.buttonText || 'Browse'}
            </Button>
          )
        }
      />
    </Box>
  );
};
