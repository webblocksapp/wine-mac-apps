import { Component } from 'solid-js';
import { CssProps, ShadowProps } from '@interfaces';

export const withShadow = <T,>(BaseComponent: Component<T>) => {
  return (props: T & ShadowProps & CssProps) => (
    <BaseComponent
      {...props}
      classList={{
        ...props.classList,
        'shadow-none': props.boxShadow == 0,
        'shadow-sm': props.boxShadow == 1,
        shadow: props.boxShadow == 2,
        'shadow-lg': props.boxShadow == 3,
      }}
    />
  );
};
