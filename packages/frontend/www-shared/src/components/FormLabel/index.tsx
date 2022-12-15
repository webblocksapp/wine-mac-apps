import { Component, JSX, splitProps } from 'solid-js';

export interface FormLabelProps
  extends JSX.LabelHTMLAttributes<HTMLLabelElement> {
  error?: boolean;
}

export const FormLabel: Component<FormLabelProps> = (props) => {
  const [local, rest] = splitProps(props, ['error']);

  return <label {...rest} classList={{ invalid: local.error }} />;
};
