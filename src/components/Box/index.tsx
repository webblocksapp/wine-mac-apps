import { Component, JSX } from 'solid-js';
import {
  BorderProps,
  CssProps,
  DisplayProps,
  FlexboxProps,
  GridProps,
  ShadowProps,
  SizingProps,
  SpacingProps,
} from '@interfaces';
import {
  withBorder,
  withDisplay,
  withFlex,
  withGrid,
  withShadow,
  withSizing,
  withSpacing,
} from '@hocs';

export interface BaseBoxProps
  extends Omit<JSX.HTMLAttributes<HTMLDivElement>, 'style' | 'classList'> {}
export interface BoxProps
  extends BaseBoxProps,
    FlexboxProps,
    GridProps,
    SpacingProps,
    BorderProps,
    ShadowProps,
    SizingProps,
    DisplayProps,
    CssProps {}

export const Box: Component<BoxProps> = withSizing(
  withShadow(
    withBorder(
      withDisplay(
        withGrid(
          withFlex(
            withSpacing((props: BaseBoxProps) => (
              <div {...props}>{props.children}</div>
            ))
          )
        )
      )
    )
  )
);
