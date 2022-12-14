import { Box, BoxProps } from '@components';
import { Component, splitProps } from 'solid-js';

export interface SidebarProps extends BoxProps {}

export const Sidebar: Component<SidebarProps> = (props) => {
  return <Box {...props} class="sidebar" />;
};