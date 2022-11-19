import { Component, createEffect } from 'solid-js';
import { CssProps, PositionProps, Style } from '@interfaces';

export const withPosition = <T,>(BaseComponent: Component<T>) => {
  return (props: T & PositionProps & CssProps) => {
    return (
      <BaseComponent
        {...props}
        style={{
          'z-index': props.zIndex,
          top: props.top,
          right: props.right,
          left: props.left,
          bottom: props.bottom,
          ...props.style,
        }}
        classList={{
          'position-static': props.position === 'static',
          'position-relative': props.position === 'relative',
          'position-absolute': props.position === 'absolute',
          'position-fixed': props.position === 'fixed',
          'position-sticky': props.position === 'sticky',
          ...props.classList,
        }}
      />
    );
  };
};
