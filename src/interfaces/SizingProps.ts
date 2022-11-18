import { JSX } from 'solid-js';

export interface SizingProps {
  width?: JSX.CSSProperties['width'] | number;
  maxWidth?: JSX.CSSProperties['max-width'];
  minWidth?: JSX.CSSProperties['min-width'];
  height?: JSX.CSSProperties['height'];
  maxHeight?: JSX.CSSProperties['max-height'];
  minHeight?: JSX.CSSProperties['min-height'];
  boxSizing?: JSX.CSSProperties['box-sizing'];
  fullWidth?: boolean;
  fullHeight?: boolean;
}
