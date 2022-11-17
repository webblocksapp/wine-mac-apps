import { CommonObject } from '@interfaces';
import { JSX } from 'solid-js';

export type CssProps = {
  class?: string;
  classList?: CommonObject;
  style?: JSX.CSSProperties;
};
