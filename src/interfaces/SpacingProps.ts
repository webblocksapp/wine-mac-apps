import { SpacingScale } from '@interfaces';

export interface SpacingProps {
  m?: SpacingScale | 'auto';
  mt?: SpacingScale;
  mr?: SpacingScale;
  mb?: SpacingScale;
  ml?: SpacingScale;
  mx?: SpacingScale;
  my?: SpacingScale;
  p?: SpacingScale;
  pt?: SpacingScale;
  pr?: SpacingScale;
  pb?: SpacingScale;
  pl?: SpacingScale;
  px?: SpacingScale;
  py?: SpacingScale;
  margin?: SpacingScale | 'auto';
  marginTop?: SpacingScale;
  marginRight?: SpacingScale;
  marginBottom?: SpacingScale;
  marginLeft?: SpacingScale;
  marginX?: SpacingScale | 'auto';
  marginY?: SpacingScale | 'auto';
  padding?: SpacingScale | 'auto';
  paddingTop?: SpacingScale;
  paddingRight?: SpacingScale;
  paddingBottom?: SpacingScale;
  paddingLeft?: SpacingScale;
  paddingX?: SpacingScale | 'auto';
  paddingY?: SpacingScale | 'auto';
}
