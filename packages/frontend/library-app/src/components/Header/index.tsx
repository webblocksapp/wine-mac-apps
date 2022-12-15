import { Component, JSXElement } from 'solid-js';
import { Box, Typography } from '@shared';

export interface HeaderProps {
  headerText?: string;
  logo?: JSXElement;
}

export const Header: Component = () => {
  return (
    <Box
      class="header"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      p={3}
      boxShadow={2}
    >
      <Box display="flex" alignItems="center">
        <Box></Box>
        <Typography component="h6">Wine Mac Apps</Typography>
      </Box>
    </Box>
  );
};
