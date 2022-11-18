import { JSX } from 'solid-js';
import { FlexboxProps, GridProps, SpacingProps } from '@interfaces';
import {
  withBorder,
  withDisplay,
  withFlex,
  withGrid,
  withShadow,
  withSizing,
  withSpacing,
} from '@hocs';

export interface BaseBoxProps extends JSX.HTMLAttributes<HTMLDivElement> {}
export interface BoxProps
  extends BaseBoxProps,
    FlexboxProps,
    GridProps,
    SpacingProps {}

export const Box = withSizing(
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
