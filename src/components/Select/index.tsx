import { Box, FormHelperText, FormLabel, List, ListItem } from '@components';
import { SelectableOption } from '@interfaces';
import { FormHandler } from 'solid-form-handler';
import {
  Component,
  createEffect,
  createSignal,
  createUniqueId,
  For,
  JSX,
  splitProps,
} from 'solid-js';
import { createStore } from 'solid-js/store';
import './index.css';

export interface SelectProps
  extends Omit<
    JSX.DetailsHtmlAttributes<HTMLDetailsElement>,
    'onInput' | 'onBlur'
  > {
  error?: boolean;
  errorMessage?: string;
  helperText?: string;
  formHandler?: FormHandler;
  label?: string;
  name?: string;
  value?: any;
  mapConfig?: {
    fn: (value: any) => any;
    valueKey: string;
  };
  options?: Array<SelectableOption>;
  placeholder?: string;
  triggers?: string[];
  onInput?: (event: { currentTarget: HTMLLIElement; target: Element }) => void;
  onBlur?: (event: { currentTarget: HTMLElement }) => void;
}

export const Select: Component<SelectProps> = (props) => {
  let detailsRef: HTMLDetailsElement | undefined;
  let summaryRef: HTMLDetailsElement | undefined;
  const id = createUniqueId();

  /**
   * Props are divided in two groups:
   * - local: newer or extended/computed props.
   * - rest: remaining inherited props applied to the original component.
   */
  const [local, rest] = splitProps(props, [
    'classList',
    'error',
    'errorMessage',
    'formHandler',
    'helperText',
    'id',
    'label',
    'onBlur',
    'onInput',
    'options',
    'placeholder',
    'role',
    'name',
    'triggers',
    'value',
  ]);

  /**
   * Click flag for avoid validating during an option is selected.
   */
  const [optionHovered, setOptionHovered] = createSignal(false);

  /**
   * Derived/computed states from props.
   */
  const [store, setStore] = createStore({
    error: false,
    errorMessage: '',
    id: '',
    value: '',
    selectedOptionLabel: '',
  });

  /**
   * Derived/computed options from props
   */
  const [options, setOptions] = createSignal<SelectableOption[]>([]);

  /**
   * Extended onInput event.
   */
  const onInput: SelectProps['onInput'] = (event) => {
    //Form handler prop sets and validate the value onInput.
    local.formHandler?.setFieldValue?.(
      local.name,
      mapSelectedOption(event?.currentTarget.getAttribute('data-value')),
      {
        htmlElement: event.currentTarget,
        validateOn: ['input'],
      }
    );

    //onInput prop is preserved
    local?.onInput?.(event);
    detailsRef?.removeAttribute('open');

    setOptionHovered(false);
  };

  /**
   * Extended onBlur event.
   */
  const onBlur: SelectProps['onBlur'] = (event) => {
    if (optionHovered()) return;

    //Form handler prop validate and touch the field.
    local.formHandler?.validateField?.(local.name, {
      validateOn: ['blur'],
    });
    local.formHandler?.touchField?.(local.name);

    //onBlur prop is preserved
    local?.onBlur?.(event);
  };

  /**
   * Maps the value to the desired type.
   */
  const mapSelectedOption = (value: any) => {
    return props?.mapConfig?.fn?.(value) ?? value;
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
        ? local.formHandler?.getFieldValue?.(local.name)
        : local.value
    );
  });

  /**
   * Updates error message signal according to the given prop or form handler state.
   */
  createEffect(() => {
    setStore(
      'errorMessage',
      local.errorMessage || local.formHandler?.getFieldError?.(local.name) || ''
    );
  });

  /**
   * Updates error flag signal according to the given prop or form handler state.
   */
  createEffect(() => {
    setStore(
      'error',
      local.error || local.formHandler?.fieldHasError?.(local.name) || false
    );
  });

  /**
   * Initializes the form field unique id.
   */
  createEffect(() => {
    setStore('id', local.id || local.name || id);
  });

  /**
   * Computes the select options by using the placeholder and options props.
   */
  createEffect(() => {
    setOptions(() => [
      ...(local.placeholder ? [{ value: '', label: local.placeholder }] : []),
      ...(local.options || []),
    ]);
  });

  /**
   * Triggers dependant validations
   */
  createEffect(() => {
    local?.formHandler?.setFieldTriggers?.(local.name, local.triggers);
  });

  /**
   * Initializes component's default value
   */
  createEffect(() => {
    local.formHandler?.setFieldDefaultValue?.(local.name, local.value);
  });

  createEffect(() => {
    const valueKey = props.mapConfig?.valueKey;
    const value = valueKey ? (store.value as any)[valueKey] : store.value;
    const label =
      local?.options?.find((option) => option?.value == value)?.label || '';
    setStore('selectedOptionLabel', label);
  });

  return (
    <Box>
      {local.label && (
        <FormLabel
          for={store.id}
          error={store.error}
          onClick={() => {
            detailsRef?.setAttribute('open', 'true');
            summaryRef?.focus();
          }}
        >
          {local.label}
        </FormLabel>
      )}
      <details
        {...rest}
        classList={{
          ...local.classList,
          select: true,
        }}
        id={store.id}
        role="list"
        ref={detailsRef}
      >
        <summary
          aria-haspopup="listbox"
          ref={summaryRef}
          onBlur={onBlur}
          classList={{
            'invalid-border': store.error,
            'invalid-icon': store.error,
          }}
        >
          {store.selectedOptionLabel || local.placeholder}
        </summary>
        <List role="listbox">
          <For each={options()}>
            {(option) => (
              <ListItem
                data-value={option.value}
                onClick={onInput}
                onMouseEnter={() => {
                  setOptionHovered(true);
                }}
                onMouseLeave={() => {
                  setOptionHovered(false);
                }}
              >
                {option.label}
              </ListItem>
            )}
          </For>
        </List>
      </details>
      {local.helperText && <FormHelperText>{local.helperText}</FormHelperText>}
      {store.error && (
        <FormHelperText error={store.error}>
          {store.errorMessage}
        </FormHelperText>
      )}
    </Box>
  );
};
