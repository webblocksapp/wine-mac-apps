import {
  Component,
  createEffect,
  createSelector,
  createSignal,
  createUniqueId,
  For,
  onMount,
  splitProps,
} from 'solid-js';
import {
  Accordion,
  Box,
  Checkbox,
  CheckboxesProps,
  Grid,
  TextInput,
} from '@components';
import { useWinetrickModel } from '@models';
import { capitalize, debounce } from '@utils';
import { createStore } from 'solid-js/store';
import { WinetrickType } from '@interfaces';

export interface WinetricksSelectorProps
  extends Omit<CheckboxesProps, 'options' | 'label'> {}

export const WinetricksSelector: Component<WinetricksSelectorProps> = (
  props
) => {
  const winetricksModel = useWinetrickModel();
  const allWinetricks = winetricksModel.selectWinetricks();
  const loading = winetricksModel.selectListing();
  const [winetricks, setWinetricks] = createSignal(allWinetricks());
  const [verb, setVerb] = createSignal('');
  const id = createUniqueId();

  /**
   * Props are divided in two groups:
   * - local: newer or extended/computed props.
   * - rest: remaining props from the interface.
   */
  const [local, rest] = splitProps(props, [
    'error',
    'errorMessage',
    'id',
    'onChange',
    'onBlur',
  ]);

  /**
   * Derived/computed states from props.
   */
  const [store, setStore] = createStore({
    errorMessage: '',
    error: false,
    value: [],
    id: '',
  });

  /**
   * Checkbox is checked
   */
  const checked = createSelector(
    () => store.value,
    (optionValue: string | number, storeValue) =>
      storeValue?.some?.((item) => item == optionValue)
  );

  /**
   * Checkboxes onChange logic.
   */
  const onChange: CheckboxesProps['onChange'] = (event) => {
    //If checked, value is pushed inside form handler.
    if (event.currentTarget.checked) {
      rest.formHandler?.setFieldValue?.(
        rest.name,
        [...store.value, event.currentTarget.value],
        {
          validateOn: [event.type],
        }
      );

      //If unchecked, value is filtered from form handler.
    } else {
      rest.formHandler?.setFieldValue?.(
        rest.name,
        store.value?.filter?.((item: any) => event.currentTarget.value != item)
      );
    }

    //onChange prop is preserved
    if (typeof local.onChange === 'function') {
      local.onChange(event);
    } else {
      local.onChange?.[0](local.onChange?.[1], event);
    }
  };

  /**
   * Filters tricks
   */
  const filter = debounce((verb: string) => {
    const filteredWinetricks = { ...allWinetricks() };

    if (verb) {
      Object.keys(filteredWinetricks).forEach((key) => {
        const type = key as keyof typeof filteredWinetricks;
        filteredWinetricks[type] = filteredWinetricks[type].filter((item) =>
          item.verb.match(new RegExp(verb.toLowerCase(), 'ig'))
        );
      });
    }

    setWinetricks(filteredWinetricks);
  }, 100);

  /**
   * Checkboxes onBlur event.
   */
  const onBlur: CheckboxesProps['onBlur'] = (event) => {
    //Form handler prop validate and touch the field.
    rest.formHandler?.validateField?.(rest.name, { validateOn: [event.type] });
    rest.formHandler?.touchField?.(rest.name);

    //onBlur prop is preserved
    if (typeof local.onBlur === 'function') {
      local.onBlur(event);
    } else {
      local.onBlur?.[0](local.onBlur?.[1], event);
    }
  };

  /**
   * No winetrick found
   */
  const notFound = (winetrickType: WinetrickType) =>
    verb() && !winetricks()?.[winetrickType]?.length;

  /**
   * Updates error message signal according to the given prop or form handler state.
   */
  createEffect(() => {
    setStore(
      'errorMessage',
      local.errorMessage || rest.formHandler?.getFieldError?.(rest.name) || ''
    );
  });

  /**
   * Updates error flag signal according to the given prop or form handler state.
   */
  createEffect(() => {
    setStore(
      'error',
      local.error || rest.formHandler?.fieldHasError?.(rest.name) || false
    );
  });

  /**
   * Initializes the form field unique id.
   */
  createEffect(() => {
    setStore('id', local.id || rest.name || id);
  });

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
      rest.formHandler
        ? rest.formHandler?.getFieldValue?.(rest.name)
        : rest.value
    );
  });

  /**
   * Initializes the form field default value.
   */
  createEffect(() => {
    rest.formHandler?.setFieldDefaultValue(rest.name, rest.value);
  });

  /**
   * Triggers dependant validations
   */
  createEffect(() => {
    rest?.formHandler?.setFieldTriggers?.(rest.name, rest.triggers);
  });

  /**
   * Filters winetricks
   */
  createEffect(() => {
    (loading() === false || verb() !== undefined) && filter(verb());
  });

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TextInput
          label="Winetricks"
          placeholder="Search"
          type="search"
          onInput={(event) => setVerb(event.currentTarget.value)}
          disabled={loading()}
        />
      </Grid>
      <Grid item xs={12}>
        <For each={Object.keys(winetricks()) as Array<WinetrickType>}>
          {(winetrickType) => (
            <>
              {notFound(winetrickType) ? (
                <></>
              ) : (
                <Accordion
                  disabled={loading()}
                  text={capitalize(winetrickType)}
                >
                  <Grid container spacing={2}>
                    {loading() === true && <Box>Loading winetricks...</Box>}
                    {loading() === false && (
                      <For each={winetricks()?.[winetrickType]}>
                        {(trick, i) => (
                          <Grid item xs={12} md={3}>
                            <Checkbox
                              display={rest.display}
                              id={`${store.id}-${i()}`}
                              label={trick.verb}
                              value={trick.verb}
                              name={rest.name}
                              onChange={onChange}
                              onBlur={onBlur}
                              error={store.error}
                              checked={checked(trick.verb)}
                            />
                          </Grid>
                        )}
                      </For>
                    )}
                  </Grid>
                </Accordion>
              )}
            </>
          )}
        </For>
      </Grid>
    </Grid>
  );
};
