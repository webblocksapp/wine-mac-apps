import { Component, JSX } from 'solid-js';
import './index.css';

export interface CardProps extends JSX.HTMLAttributes<HTMLElement> {}

export const Card: Component<CardProps> = (props) => (
  <article {...props} classList={{ card: true, ...props.classList }} />
);
