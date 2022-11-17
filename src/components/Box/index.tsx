import { JSX } from 'solid-js';
import { FlexboxProps, GridProps, SpacingProps } from '@interfaces';
import { withFlex, withGrid, withSpacing } from '@hocs';

export interface BaseBoxProps extends JSX.HTMLAttributes<HTMLDivElement> {}
export interface BoxProps
  extends BaseBoxProps,
    FlexboxProps,
    GridProps,
    SpacingProps {}

export const Box = withGrid(
  withFlex(
    withSpacing((props: BaseBoxProps) => <div {...props}>{props.children}</div>)
  )
);
