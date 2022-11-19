import { Component } from 'solid-js';
import { CssProps, DisplayProps } from '@interfaces';

export const withDisplay = <T,>(BaseComponent: Component<T>) => {
  return (props: T & DisplayProps & CssProps) => {
    return (
      <BaseComponent
        {...props}
        classList={{
          'd-block': props.display === 'block',
          'd-flex': props.display === 'flex',
          'd-grid': props.display === 'grid',
          'd-none': props.display === 'none',
          'd-inline': props.display === 'inline',
          'd-inline-block': props.display === 'inline-block',
          'd-table': props.display === 'table',
          'd-table-cell': props.display === 'table-cell',
          'd-table-row': props.display === 'table-row',
          'd-inline-flex': props.display === 'inline-flex',
          ...props.classList,
        }}
      />
    );
  };
};
