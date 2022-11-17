import { CssProps, GridProps } from '@interfaces';
import { Component, JSX } from 'solid-js';

export const withGrid = <T,>(BaseComponent: Component<T>) => {
  return (props: T & GridProps & CssProps) => {
    return (
      <BaseComponent
        {...props}
        style={{
          ...props.style,
          'grid-template-columns': props.gridTemplateColumns,
          'grid-template-rows': props.gridTemplateRows,
          'grid-area': props.gridArea,
          'grid-template-areas': props.gridTemplateAreas,
        }}
      />
    );
  };
};
