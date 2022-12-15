import { Component, JSX, splitProps } from 'solid-js';

export interface ListProps extends JSX.OlHTMLAttributes<HTMLUListElement> {
  bullet?: boolean;
}

export const List: Component<ListProps> = (props) => {
  const [local, rest] = splitProps(props, ['bullet', 'classList']);

  return (
    <ul
      {...rest}
      classList={{ ...local.classList, 'no-bullet': local.bullet ?? true }}
    />
  );
};
