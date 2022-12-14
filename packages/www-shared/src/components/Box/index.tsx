import { Component, JSX } from 'solid-js';
import {
  BorderProps,
  CssProps,
  DisplayProps,
  FlexboxProps,
  GridProps,
  PositionProps,
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
  withPosition,
  withClass,
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
    PositionProps,
    CssProps {}

export const Box: Component<BoxProps> = withPosition(
  withSizing(
    withShadow(
      withBorder(
        withDisplay(
          withGrid(
            withFlex(
              withSpacing(
                withClass((props: BaseBoxProps) => {
                  return <div {...props}>{props.children}</div>;
                })
              )
            )
          )
        )
      )
    )
  )
);
