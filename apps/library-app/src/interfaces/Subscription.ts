import { observable } from 'solid-js';

export type Subscription = ReturnType<
  ReturnType<typeof observable>['subscribe']
>;
