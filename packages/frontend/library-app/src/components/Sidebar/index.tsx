import { Box, BoxProps } from '@shared';
import { Component } from 'solid-js';

export interface SidebarProps extends BoxProps {}

export const Sidebar: Component<SidebarProps> = (props) => {
  return <Box {...props} class="sidebar" />;
};
