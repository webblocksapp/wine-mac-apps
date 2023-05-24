import { Box, FormHelperText, FormLabel, List, ListItem } from '@components';
import { CommonObject, SelectableOption } from '@interfaces';
import { CommonEvent, Field, FieldProps } from 'solid-form-handler';
import {
  Component,
  createEffect,
  createSignal,
  For,
  JSX,
  Show,
} from 'solid-js';
import { createStore } from 'solid-js/store';
import './index.css';

export type SelectProps = FieldProps &
  Omit<JSX.DetailsHtmlAttributes<HTMLDetailsElement>, 'onInput' | 'onBlur'> & {
    helperText?: string;
    label?: string;
    mapConfig?: {
      fn: (value: any) => any;
      valueKey: string;
    };
    options?: Array<SelectableOption>;
    placeholder?: string;
    triggers?: string[];
    onInput?: CommonEvent;
    onBlur?: CommonEvent;
  };

export const Select: Component<SelectProps> = (props) => {
  let detailsRef: HTMLDetailsElement | undefined;
  let summaryRef: HTMLDetailsElement | undefined;

  /**
   * Click flag for avoid validating during an option is selected.
   */
  const [optionHovered, setOptionHovered] = createSignal(false);

  /**
   * Derived/computed states from props.
   */
  const [store, setStore] = createStore({
    value: props.value,
    selectedOptionLabel: '',
  });

  /**
   * Maps the value to the desired type.
   */
  const mapSelectedOption = (value: any) => {
    return props?.mapConfig?.fn?.(value) ?? value;
  };

  /**
   * Derived/computed options from props
   */
  const [options, setOptions] = createSignal<SelectableOption[]>([]);

  /**
   * Computes the select options by using the placeholder and options props.
   */
  createEffect(() => {
    setOptions(() => [
      ...(props.placeholder ? [{ value: '', label: props.placeholder }] : []),
      ...(props.options || []),
    ]);
  });

  /**
   * Initializes selected option text.
   */
  createEffect(() => {
    const valueKey = props.mapConfig?.valueKey;
    const value = valueKey
      ? (store?.value as CommonObject)?.[valueKey]
      : store.value;
    const label =
      props?.options?.find((option) => option?.value == value)?.label || '';
    setStore('selectedOptionLabel', label);
  });

  return (
    <Field
      {...props}
      mode="input"
      render={(field) => (
        <Box>
          <Show when={props.label}>
            <FormLabel
              for={field.props.id}
              error={field.helpers.error}
              onClick={() => {
                detailsRef?.setAttribute('open', 'true');
                summaryRef?.focus();
              }}
            >
              {props.label}
            </FormLabel>
          </Show>
          <details
            classList={{
              ...props.classList,
              select: true,
            }}
            id={field.props.id}
            role="list"
            ref={detailsRef}
          >
            <summary
              aria-haspopup="listbox"
              ref={summaryRef}
              onBlur={(event) => {
                if (optionHovered()) return;
                const onBlur = field.props.onBlur;
                if (typeof onBlur === 'function') {
                  onBlur(event);
                } else {
                  onBlur?.[0](onBlur?.[1], event);
                }
              }}
              classList={{
                'invalid-border': field.helpers.error,
                'invalid-icon': field.helpers.error,
              }}
            >
              {store.selectedOptionLabel || props.placeholder}
            </summary>
            <List role="listbox">
              <For each={options()}>
                {(option) => (
                  <ListItem
                    data-value={option.value}
                    onClick={(event) => {
                      const value = mapSelectedOption(
                        event?.currentTarget.getAttribute('data-value')
                      );
                      detailsRef?.removeAttribute('open');
                      field.helpers.onValueChange(value);
                      setStore('value', value);
                      setOptionHovered(false);
                      summaryRef?.focus();
                    }}
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
