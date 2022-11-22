import { Component, JSX, splitProps } from 'solid-js';

export interface ButtonProps
  extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: 'primary' | 'secondary' | 'contrast';
  variant?: 'outline' | 'filled';
}

export const Button: Component<ButtonProps> = (props) => {
  const [local, rest] = splitProps(props, ['classList']);

  return (
    <button
      type="button"
      classList={{
        ...local.classList,
        primary: props.color === 'primary',
        secondary: props.color === 'secondary',
        contrast: props.color === 'contrast',
        outline: props.variant === 'outline',
        filled: props.variant === ('filled' || undefined),
      }}
      {...rest}
    />
  );
};
