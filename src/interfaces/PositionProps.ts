import { PositionScale } from '@interfaces';
import { JSX } from 'solid-js';

export interface PositionProps {
  position?: JSX.CSSProperties['position'];
  zIndex?: JSX.CSSProperties['z-index'];
  top?: PositionScale;
  right?: PositionScale;
  bottom?: PositionScale;
  left?: PositionScale;
}
