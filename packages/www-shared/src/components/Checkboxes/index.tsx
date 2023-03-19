import { Field, FieldProps } from 'solid-form-handler';
import { Component, For, JSX, Show } from 'solid-js';
import { Box, Checkbox, FormHelperText, FormLabel } from '@components';

type SelectableOption = { value: string | number; label: string };

export type CheckboxesProps = FieldProps & {
  display?: 'switch';
  helperText?: string;
  label?: string;
  options?: Array<SelectableOption>;
  onChange?: JSX.DOMAttributes<HTMLInputElement>['onChange'];
  onBlur?: JSX.DOMAttributes<HTMLInputElement>['onBlur'];
};

export const Checkboxes: Component<CheckboxesProps> = (props) => {
  return (
    <Field
      {...props}
      mode="checkbox-group"
      render={(field) => (
        <Box>
          <Show when={props.label}>
            <FormLabel error={field.helpers.error}>{props.label}</FormLabel>
          </Show>
          <Box>
            <For each={props.options}>
              {(option, i) => (
                <Checkbox
                  display={props.display}
                  id={`${field.props.id}-${i()}`}
                  label={option.label}
                  value={option.value}
                  name={field.props.name}
                  onChange={field.props.onChange}
                  onBlur={field.props.onBlur}
                  error={field.helpers.error}
                  checked={field.helpers.isChecked(option.value)}
                />
              )}
            </For>
          </Box>
          <Show when={props.helperText}>
            <FormHelperText>{props.helperText}</FormHelperText>
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
