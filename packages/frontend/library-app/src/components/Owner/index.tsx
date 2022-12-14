import { Component, getOwner, JSXElement } from 'solid-js';
import { GLOBALS } from '@constants';

export const Owner: Component<{ children?: JSXElement }> = (props) => {
  GLOBALS.owner = getOwner();
  return <>{props.children}</>;
};
