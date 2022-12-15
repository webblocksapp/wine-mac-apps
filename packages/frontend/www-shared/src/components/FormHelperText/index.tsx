import { Component, JSXElement } from 'solid-js';

export interface FormHelperText {
  error?: boolean;
  children?: JSXElement;
}

export const FormHelperText: Component<FormHelperText> = (props) => {
  return (
    <small
      style="display: block"
      classList={{ 'helper-text': true, invalid: props.error }}
    >
      {props.children}
    </small>
  );
};
