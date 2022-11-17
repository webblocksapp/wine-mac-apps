import { JSX } from 'solid-js';

export interface GridProps {
  gap?: JSX.CSSProperties['gap'];
  columnGap?: JSX.CSSProperties['column-gap'];
  rowGap?: JSX.CSSProperties['row-gap'];
  gridColumn?: JSX.CSSProperties['grid-column'];
  gridRow?: JSX.CSSProperties['grid-row'];
  gridAutoFlow?: JSX.CSSProperties['grid-auto-flow'];
  gridAutoColumns?: JSX.CSSProperties['grid-auto-columns'];
  gridAutoRows?: JSX.CSSProperties['grid-auto-rows'];
  gridTemplateColumns?: JSX.CSSProperties['grid-template-columns'];
  gridTemplateRows?: JSX.CSSProperties['grid-template-rows'];
  gridTemplateAreas?: JSX.CSSProperties['grid-template-areas'];
  gridArea?: JSX.CSSProperties['grid-area'];
}
