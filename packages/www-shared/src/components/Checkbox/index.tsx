import { Field, FieldProps } from 'solid-form-handler';
import { Component, JSX, Show, splitProps } from 'solid-js';
import { Box, FormHelperText, FormLabel } from '@components';

export type CheckboxProps = FieldProps &
  Omit<JSX.InputHTMLAttributes<HTMLInputElement>, 'type'> & {
    display?: 'switch';
    helperText?: string;
    label?: string;
    uncheckedValue?: string | number;
  };

export const Checkbox: Component<CheckboxProps> = (props) => {
  const [local, rest] = splitProps(props, [
    'classList',
    'display',
    'formHandler',
    'helperText',
    'label',
  ]);

  return (
    <Field
      {...props}
      mode="checkbox"
      render={(field) => (
        <Box classList={local.classList}>
          <Box>
            <input
              {...rest}
              {...field.props}
              role={local.display}
              type="checkbox"
              classList={{
                'is-invalid': field.helpers.error,
                'form-check-input': true,
              }}
            />
            <Show when={local.label}>
              <FormLabel error={field.helpers.error} for={field.props.id}>
                {local.label}
              </FormLabel>
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
