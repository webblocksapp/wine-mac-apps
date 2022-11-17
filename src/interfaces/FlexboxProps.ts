import { JSX } from 'solid-js';

export interface FlexboxProps {
  flexDirection?: JSX.CSSProperties['flex-direction'];
  flexWrap?: JSX.CSSProperties['flex-wrap'];
  justifyContent?: JSX.CSSProperties['justify-content'];
  alignItems?: JSX.CSSProperties['align-items'];
  alignContent?: JSX.CSSProperties['align-content'];
  order?: JSX.CSSProperties['order'];
  flexGrow?: JSX.CSSProperties['flex-grow'];
  flexShrink?: JSX.CSSProperties['flex-shrink'];
  alignSelf?: JSX.CSSProperties['align-self'];
}
