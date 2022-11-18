import { Component, createEffect, JSX, splitProps } from 'solid-js';
import { Box, FormHelperText, FormLabel } from '@components';
import { FormHandler } from 'solid-form-handler';
import { createStore } from 'solid-js/store';

export interface TextInputProps
  extends JSX.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: boolean;
  errorMessage?: string;
  formHandler?: FormHandler;
  triggers?: string[];
}

export const TextInput: Component<TextInputProps> = (props) => {
  const [local, rest] = splitProps(props, [
    'aria-invalid',
    'error',
    'errorMessage',
    'helperText',
    'formHandler',
    'id',
    'label',
    'onBlur',
    'onInput',
    'value',
    'triggers',
  ]);

  /**
   * Derived/computed states from props.
   */
  const [store, setStore] = createStore({
    errorMessage: '',
    error: false,
    value: '',
    id: '',
  });

  /**
   * Extended onInput event.
   */
  const onInput: TextInputProps['onInput'] = (event) => {
    //Form handler prop sets and validate the value onInput.
    local.formHandler?.setFieldValue?.(rest.name, event.currentTarget.value, {
      htmlElement: event.currentTarget,
      validateOn: [event.type],
    });

    //onInput prop is preserved
    if (typeof local.onInput === 'function') {
      local.onInput(event);
    } else {
      local.onInput?.[0](local.onInput?.[1], event);
    }
  };

  /**
   * Extended onBlur event.
   */
  const onBlur: TextInputProps['onBlur'] = (event) => {
    //Form handler prop validate and touch the field.
    local.formHandler?.validateField?.(rest.name, { validateOn: [event.type] });
    local.formHandler?.touchField?.(rest.name);

    //onBlur prop is preserved
    if (typeof local.onBlur === 'function') {
      local.onBlur(event);
    } else {
      local.onBlur?.[0](local.onBlur?.[1], event);
    }
  };

  /**
   * Controls component's value.
   */
  createEffect(() => {
    /**
     * If formHandler is defined, value is controlled by
     * the same component, if no, by the value prop.
     */
    setStore(
      'value',
      local.formHandler
        ? local.formHandler?.getFieldValue?.(rest.name)
        : local.value || ''
    );
  });

  /**
   * Updates error message signal according to the given prop or form handler state.
   */
  createEffect(() => {
    setStore(
      'errorMessage',
      local.errorMessage || local.formHandler?.getFieldError?.(rest.name) || ''
    );
  });

  /**
   * Updates error flag signal according to the given prop or form handler state.
   */
  createEffect(() => {
    setStore(
      'error',
      local.error || local.formHandler?.fieldHasError?.(rest.name) || false
    );
  });

  /**
   * Initializes the form field unique id.
   */
  createEffect(() => {
    setStore('id', local.id || rest.name || '');
  });

  /**
   * Initializes component's default value
   */
  createEffect(() => {
    local.formHandler?.setFieldDefaultValue?.(rest.name, local.value);
  });

  /**
   * Triggers dependant validations
   */
  createEffect(() => {
    local?.formHandler?.setFieldTriggers?.(rest.name, local.triggers);
  });

  return (
    <Box>
      {local.label && (
        <FormLabel for={store.id} error={store.error}>
          {local.label}
        </FormLabel>
      )}
      <input
        {...rest}
        id={store.id}
        aria-invalid={store.error || undefined}
        onInput={onInput}
        onBlur={onBlur}
        value={store.value}
      />
      {local.helperText && <FormHelperText>{local.helperText}</FormHelperText>}
      {store.error && (
        <FormHelperText error={store.error}>
          {store.errorMessage}
        </FormHelperText>
      )}
    </Box>
  );
};
