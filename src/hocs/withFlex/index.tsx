import { Component } from 'solid-js';
import { CssProps, FlexboxProps } from '@interfaces';

export const withFlex = <T,>(BaseComponent: Component<T>) => {
  return (props: T & FlexboxProps & CssProps) => (
    <BaseComponent
      {...props}
      classList={{
        'align-content-around': props.alignContent === 'space-around',
        'align-content-center': props.alignContent === 'center',
        'align-content-end': props.alignContent === 'flex-end',
        'align-content-start': props.alignContent === 'flex-start',
        'align-content-stretch': props.alignContent === 'stretch',
        'align-items-baseline': props.alignItems === 'baseline',
        'align-items-center': props.alignItems === 'center',
        'align-items-end': props.alignItems === 'flex-end',
        'align-items-start': props.alignItems === 'flex-start',
        'align-items-stretch': props.alignItems === 'stretch',
        'align-self-baseline': props.alignSelf === 'baseline',
        'align-self-center': props.alignSelf === 'center',
        'align-self-end': props.alignSelf === 'flex-end',
        'align-self-start': props.alignSelf === 'flex-start',
        'align-self-stretch': props.alignSelf === 'stretch',
        'flex-column-reverse': props.flexDirection === 'column-reverse',
        'flex-column': props.flexDirection === 'column',
        'flex-grow-0': props.flexGrow == 0,
        'flex-grow-1': props.flexGrow == 1,
        'flex-nowrap': props.flexWrap === 'nowrap',
        'flex-row-reverse': props.flexDirection === 'row-reverse',
        'flex-row': props.flexDirection === 'row',
        'flex-shrink-0': props.flexShrink == 0,
        'flex-shrink-1': props.flexShrink == 1,
        'flex-wrap-reverse': props.flexWrap === 'wrap-reverse',
        'flex-wrap': props.flexWrap === 'wrap',
        'justify-content-around': props.justifyContent === 'space-around',
        'justify-content-between': props.justifyContent === 'space-between',
        'justify-content-center': props.justifyContent === 'center',
        'justify-content-end': props.justifyContent === 'flex-end',
        'justify-content-evenly': props.justifyContent === 'space-evenly',
        'justify-content-start': props.justifyContent === 'flex-start',
        'order-1': props.order == 1,
        'order-2': props.order == 2,
        'order-3': props.order == 3,
        'order-first': props.order == -1,
        'order-last': props.order == 6,
        ...props.classList,
      }}
    />
  );
};
