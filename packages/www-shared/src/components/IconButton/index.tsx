import { Box, Button, ButtonProps } from '@components';
import { Component, JSXElement, splitProps } from 'solid-js';

export interface IconButtonProps extends Omit<ButtonProps, 'children'> {
  icon: JSXElement;
  text?: string;
}

export const IconButton: Component<IconButtonProps> = (props) => {
  const [local, rest] = splitProps(props, ['icon', 'text']);

  return (
    <Button {...rest}>
      <Box display="flex" alignItems="center" justifyContent="center">
        <Box display="flex" alignItems="center" mr={local.text ? 2 : 0}>
          {local.icon}
        </Box>
        {local.text && <Box>{local.text}</Box>}
      </Box>
    </Button>
  );
};
