import { Component, createEffect, splitProps } from 'solid-js';
import { CommonObject, CssProps } from '@interfaces';
import { createStore } from 'solid-js/store';
import { classToClassList } from '@utils';

export const withClass = <T,>(BaseComponent: Component<T>) => {
  return (props: T & CssProps) => {
    const [local, rest] = splitProps(props, ['class', 'classList']);
    const [classList, setClassList] = createStore<CommonObject>({});

    createEffect(() => {
      setClassList(classToClassList(local.class));
    });

    return (
      <BaseComponent
        {...(rest as any)}
        classList={{ ...local.classList, ...classList }}
      />
    );
  };
};
