import { Component, JSXElement } from 'solid-js';
import '@picocss/pico/css/pico.css';
import './index.css';

export interface ThemeProviderProps {
  children: JSXElement;
}

export const ThemeProvider: Component<ThemeProviderProps> = (props) => {
  return <>{props.children}</>;
};
