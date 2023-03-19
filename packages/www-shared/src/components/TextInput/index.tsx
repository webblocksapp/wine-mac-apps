import { Component, JSX, JSXElement, Show, splitProps } from 'solid-js';
import { Box, FormHelperText, FormLabel } from '@components';
import { Field, FieldProps } from 'solid-form-handler';
import './index.css';

export type TextInputProps = FieldProps &
  Omit<JSX.InputHTMLAttributes<HTMLInputElement>, 'type'> & {
    label?: string;
    helperText?: string;
    prevSlot?: JSXElement;
    nextSlot?: JSXElement;
    type?: 'text' | 'search';
  };

export const TextInput: Component<TextInputProps> = (props) => {
  const [local, rest] = splitProps(props, [
    'label',
    'helperText',
    'formHandler',
    'prevSlot',
    'nextSlot',
  ]);

  return (
    <Field
      {...props}
      mode="input"
      render={(field) => (
        <Box>
          <Show when={local.label}>
            <FormLabel for={field.props.id} error={field.helpers.error}>
              {local.label}
            </FormLabel>
          </Show>
          <Box
            display="flex"
            alignItems="stretch"
            classList={{
              'has-prev-slot': local.prevSlot,
              'has-next-slot': local.nextSlot,
            }}
          >
            <Show when={local.prevSlot}>
              <Box
                classList={{
                  'prev-slot': true,
                  'invalid-border': field.helpers.error,
                }}
                display="flex"
                alignItems="center"
              >
                {local.prevSlot}
              </Box>
            </Show>
            <input
              {...field.props}
              {...rest}
              aria-invalid={field.helpers.error || undefined}
            />
            <Show when={local.nextSlot}>
              <Box
                classList={{
                  'next-slot': true,
                  'invalid-border': field.helpers.error,
                }}
                display="flex"
                alignItems="center"
              >
                {local.nextSlot}
              </Box>
            </Show>
          </Box>
          <Show when={local.helperText}>
            <FormHelperText>{local.helperText}</FormHelperText>
          </Show>
          <Show when={field.helpers.error}>
            <FormHelperText error={field.helpers.error}>
              {field.helpers.errorMessage}
            </FormHelperText>
          </Show>
        </Box>
      )}
    />
  );
};
