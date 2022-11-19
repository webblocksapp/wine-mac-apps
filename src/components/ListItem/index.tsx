import { Component, JSX, splitProps } from 'solid-js';

export interface ListItemProps extends JSX.LiHTMLAttributes<HTMLLIElement> {
  bullet?: boolean;
}

export const ListItem: Component<ListItemProps> = (props) => {
  const [local, rest] = splitProps(props, ['bullet', 'classList']);

  return (
    <li
      {...rest}
      classList={{ ...local.classList, 'no-bullet': local.bullet ?? true }}
    />
  );
};
