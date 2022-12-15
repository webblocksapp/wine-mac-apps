import { Component } from 'solid-js';
import { SizingProps, CssProps } from '@interfaces';
import { parseSize } from '@utils';

export const withSizing = <T,>(BaseComponent: Component<T>) => {
  return (props: T & SizingProps & CssProps) => {
    const fullHeight = () => {
      return props.fullHeight ? '100%' : undefined;
    };

    const fullWidth = () => {
      return props.fullWidth ? '100%' : undefined;
    };

    return (
      <BaseComponent
        {...props}
        style={{
          width: fullWidth() || parseSize(props.width),
          height: fullHeight() || parseSize(props.height),
          maxWidth: parseSize(props.maxWidth),
          maxHeight: parseSize(props.maxHeight),
          ...props.style,
        }}
      />
    );
  };
};
