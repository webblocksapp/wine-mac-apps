import { Component, JSXElement } from 'solid-js';
import { SpacingScale, ColSize, CssProps, DisplayProps } from '@interfaces';
import { withDisplay } from '@hocs';

export interface BaseGridProps extends CssProps {
  children?: JSXElement;
  container?: boolean;
  spacing?: SpacingScale;
  rowSpacing?: SpacingScale;
  columnSpacing?: SpacingScale;
  item?: boolean;
  xs?: ColSize;
  sm?: ColSize;
  md?: ColSize;
  lg?: ColSize;
  xl?: ColSize;
  xxl?: ColSize;
}
export interface IGridProps extends BaseGridProps, DisplayProps {}

export const Grid: Component<IGridProps> = withDisplay(
  (props: BaseGridProps) => (
    <div
      classList={{
        ...props.classList,
        row: props.container,
        'g-1': props.spacing == 1,
        'g-2': props.spacing == 2,
        'g-3': props.spacing == 3,
        'g-4': props.spacing == 4,
        'g-5': props.spacing == 5,
        'gx-1': props.columnSpacing == 1,
        'gx-2': props.columnSpacing == 2,
        'gx-3': props.columnSpacing == 3,
        'gx-4': props.columnSpacing == 4,
        'gx-5': props.columnSpacing == 5,
        'gy-1': props.rowSpacing == 1,
        'gy-2': props.rowSpacing == 2,
        'gy-3': props.rowSpacing == 3,
        'gy-4': props.rowSpacing == 4,
        'gy-5': props.rowSpacing == 5,
        'col-1': props.item && props.xs == 1,
        'col-2': props.item && props.xs == 2,
        'col-3': props.item && props.xs == 3,
        'col-4': props.item && props.xs == 4,
        'col-5': props.item && props.xs == 5,
        'col-6': props.item && props.xs == 6,
        'col-7': props.item && props.xs == 7,
        'col-8': props.item && props.xs == 8,
        'col-9': props.item && props.xs == 9,
        'col-10': props.item && props.xs == 10,
        'col-11': props.item && props.xs == 11,
        'col-12':
          (props.item && props.xs == 12) ||
          (props.item && props.xs === undefined),
        'col-sm-1': props.item && props.sm == 1,
        'col-sm-2': props.item && props.sm == 2,
        'col-sm-3': props.item && props.sm == 3,
        'col-sm-4': props.item && props.sm == 4,
        'col-sm-5': props.item && props.sm == 5,
        'col-sm-6': props.item && props.sm == 6,
        'col-sm-7': props.item && props.sm == 7,
        'col-sm-8': props.item && props.sm == 8,
        'col-sm-9': props.item && props.sm == 9,
        'col-sm-10': props.item && props.sm == 10,
        'col-sm-11': props.item && props.sm == 11,
        'col-sm-12': props.item && props.sm == 12,
        'col-md-1': props.item && props.md == 1,
        'col-md-2': props.item && props.md == 2,
        'col-md-3': props.item && props.md == 3,
        'col-md-4': props.item && props.md == 4,
        'col-md-5': props.item && props.md == 5,
        'col-md-6': props.item && props.md == 6,
        'col-md-7': props.item && props.md == 7,
        'col-md-8': props.item && props.md == 8,
        'col-md-9': props.item && props.md == 9,
        'col-md-10': props.item && props.md == 10,
        'col-md-11': props.item && props.md == 11,
        'col-md-12': props.item && props.md == 12,
        'col-lg-1': props.item && props.lg == 1,
        'col-lg-2': props.item && props.lg == 2,
        'col-lg-3': props.item && props.lg == 3,
        'col-lg-4': props.item && props.lg == 4,
        'col-lg-5': props.item && props.lg == 5,
        'col-lg-6': props.item && props.lg == 6,
        'col-lg-7': props.item && props.lg == 7,
        'col-lg-8': props.item && props.lg == 8,
        'col-lg-9': props.item && props.lg == 9,
        'col-lg-10': props.item && props.lg == 10,
        'col-lg-11': props.item && props.lg == 11,
        'col-lg-12': props.item && props.lg == 12,
        'col-xl-1': props.item && props.xl == 1,
        'col-xl-2': props.item && props.xl == 2,
        'col-xl-3': props.item && props.xl == 3,
        'col-xl-4': props.item && props.xl == 4,
        'col-xl-5': props.item && props.xl == 5,
        'col-xl-6': props.item && props.xl == 6,
        'col-xl-7': props.item && props.xl == 7,
        'col-xl-8': props.item && props.xl == 8,
        'col-xl-9': props.item && props.xl == 9,
        'col-xl-10': props.item && props.xl == 10,
        'col-xl-11': props.item && props.xl == 11,
        'col-xl-12': props.item && props.xl == 12,
        'col-xxl-1': props.item && props.xxl == 1,
        'col-xxl-2': props.item && props.xxl == 2,
        'col-xxl-3': props.item && props.xxl == 3,
        'col-xxl-4': props.item && props.xxl == 4,
        'col-xxl-5': props.item && props.xxl == 5,
        'col-xxl-6': props.item && props.xxl == 6,
        'col-xxl-7': props.item && props.xxl == 7,
        'col-xxl-8': props.item && props.xxl == 8,
        'col-xxl-9': props.item && props.xxl == 9,
        'col-xxl-10': props.item && props.xxl == 10,
        'col-xxl-11': props.item && props.xxl == 11,
        'col-xxl-12': props.item && props.xxl == 12,
      }}
    >
      {props.children}
    </div>
  )
);
