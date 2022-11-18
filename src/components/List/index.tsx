import { Component, JSX } from 'solid-js';

export interface ListProps extends JSX.OlHTMLAttributes<HTMLUListElement> {}

export const List: Component<ListProps> = (props) => {
  return <ul {...props} />;
};
