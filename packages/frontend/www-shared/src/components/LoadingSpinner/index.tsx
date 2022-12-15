import { Box, BoxProps } from '@components';
import { Component } from 'solid-js';
import './index.css';

export const LoadingSpinner: Component<BoxProps> = (props) => (
  <Box {...props}>
    <span class="loading-spinner" aria-busy="true"></span>
  </Box>
);
