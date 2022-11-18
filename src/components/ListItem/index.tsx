import { Component, JSX } from 'solid-js';

export interface ListProps extends JSX.LiHTMLAttributes<HTMLLIElement> {}

export const ListItem: Component<ListProps> = (props) => {
  return <li {...props} />;
};
