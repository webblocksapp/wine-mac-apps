import { BorderScale, OneZero } from '@interfaces';

export interface BorderProps {
  border?: BorderScale;
  borderTop?: OneZero;
  borderLeft?: OneZero;
  borderRight?: OneZero;
  borderBottom?: OneZero;
  borderColor?: BorderScale;
  borderTopColor?: BorderScale;
  borderRightColor?: BorderScale;
  borderBottomColor?: BorderScale;
  borderLeftColor?: BorderScale;
  borderRadius?: BorderScale;
}
