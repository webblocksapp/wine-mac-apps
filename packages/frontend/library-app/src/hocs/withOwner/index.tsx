import { GLOBALS } from '@constants';
import { Owner, runWithOwner } from 'solid-js';

export const withOwner = <F extends (...args: any[]) => any>(
  func: F,
  owner?: Owner | null
) => {
  return (...args: Parameters<F>) => {
    return runWithOwner<ReturnType<F>>(
      (owner || GLOBALS.owner) as Owner,
      () => {
        return func.apply(null, args);
      }
    );
  };
};
