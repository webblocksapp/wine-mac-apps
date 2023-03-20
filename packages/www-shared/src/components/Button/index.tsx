import { Component, createEffect, JSX, mergeProps, splitProps } from 'solid-js';

export interface ButtonProps
  extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: 'primary' | 'secondary' | 'contrast';
  variant?: 'outline' | 'filled';
}

export const Button: Component<ButtonProps> = (props) => {
  const mergedProps = mergeProps(
    {
      variant: 'outline',
      color: 'secondary',
    },
    props
  );
  const [local, rest] = splitProps(mergedProps, [
    'classList',
    'color',
    'variant',
  ]);

  return (
    <button
      type="button"
      classList={{
        ...local.classList,
        primary: local.color === 'primary',
        secondary: local.color === 'secondary',
        contrast: local.color === 'contrast',
        outline: local.variant === 'outline',
        filled: local.variant === ('filled' || undefined),
      }}
      {...rest}
    />
  );
};
