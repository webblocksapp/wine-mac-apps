import { Component, JSXElement } from 'solid-js';
import './index.css';

export interface ThemeProviderProps {
  children: JSXElement;
}

export const ThemeProvider: Component<ThemeProviderProps> = (props) => {
  return props.children;
};
