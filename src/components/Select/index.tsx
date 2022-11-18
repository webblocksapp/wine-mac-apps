import { SelectableOption } from '@interfaces';
import { FormHandler } from 'solid-form-handler';
import {
  Component,
  createEffect,
  createSignal,
  For,
  JSX,
  splitProps,
} from 'solid-js';
import { createStore } from 'solid-js/store';

export interface SelectProps
  extends Omit<JSX.DetailsHtmlAttributes<HTMLDetailsElement>, 'onInput'> {
  error?: boolean;
  errorMessage?: string;
  formHandler?: FormHandler;
  label?: string;
  name?: string;
  value?: string | number;
  options?: Array<SelectableOption>;
  placeholder?: string;
  triggers?: string[];
  onInput: (event: { currentTarget: HTMLLIElement; target: Element }) => void;
}

export const Select: Component<SelectProps> = (props) => {
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
   * Derived/computed states from props.
   */
  const [store, setStore] = createStore({
    error: false,
    errorMessage: '',
    id: '',
    value: '',
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
      event?.currentTarget?.value,
      {
        htmlElement: event.currentTarget,
        validateOn: ['input'],
      }
    );

    //onInput prop is preserved
    local?.onInput?.(event);
  };

  /**
   * Extended onBlur event.
   */
  const onBlur: SelectProps['onBlur'] = (event) => {
    //Form handler prop validate and touch the field.
    local.formHandler?.validateField?.(local.name, {
      validateOn: [event.type],
    });
    local.formHandler?.touchField?.(local.name);

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
    setStore('id', local.id || local.name || '');
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

  return (
    <details {...rest} role="list">
      <summary aria-haspopup="listbox">{local.placeholder}</summary>
      <ul role="listbox">
        <For each={options()}>
          {(option) => (
            <li value={option.value} onClick={onInput}>
              {option.label}
            </li>
          )}
        </For>
      </ul>
    </details>
  );
};
